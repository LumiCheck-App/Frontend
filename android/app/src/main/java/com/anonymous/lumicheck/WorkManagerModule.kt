package com.anonymous.lumicheck

import android.content.Context
import android.content.SharedPreferences
import android.net.ConnectivityManager
import android.content.IntentFilter
import android.os.BatteryManager
import androidx.work.*
import com.facebook.react.bridge.*
import android.util.Log
import java.util.Calendar
import java.util.concurrent.TimeUnit
import androidx.core.content.ContextCompat

class WorkManagerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val prefs: SharedPreferences by lazy {
        reactContext.getSharedPreferences("LumiCheckPrefs", Context.MODE_PRIVATE)
    }

    override fun getName() = "WorkManagerModule"

    @ReactMethod
    fun setUserId(userId: Int) {
        prefs.edit().putInt("USER_ID", userId).apply()
    }

    @ReactMethod
    fun setAuthToken(token: String) {
        prefs.edit().putString("AUTH_TOKEN", token).apply()
    }

    @ReactMethod
    fun startWork() {
        try {
            val now = Calendar.getInstance()
            val nextRun = Calendar.getInstance().apply {
                set(Calendar.HOUR_OF_DAY, 23)
                set(Calendar.MINUTE, 0)
                set(Calendar.SECOND, 0)
                if (now.after(this)) add(Calendar.DAY_OF_YEAR, 1)
            }

            val initialDelay = nextRun.timeInMillis - now.timeInMillis

            val workRequest = OneTimeWorkRequestBuilder<MyWorker>()
                .setInitialDelay(initialDelay, TimeUnit.MILLISECONDS)
                .setConstraints(createConstraints())
                .setBackoffCriteria(
                    BackoffPolicy.LINEAR,
                    WorkRequest.MIN_BACKOFF_MILLIS,
                    TimeUnit.MILLISECONDS
                )
                .build()

            WorkManager.getInstance(reactApplicationContext)
                .beginUniqueWork(
                    "screen_time_worker",
                    ExistingWorkPolicy.REPLACE,
                    workRequest
                )
                .enqueue()

        } catch (e: Exception) {
            Log.e("WorkManagerModule", "Erro ao agendar trabalho", e)
        }
    }

    @ReactMethod
    fun checkWorkerStatus(callback: Callback) {
        WorkManager.getInstance(reactApplicationContext)
            .getWorkInfosForUniqueWorkLiveData("screen_time_worker")
            .observeForever { workInfos ->
                val status = workInfos.joinToString { 
                    "ID=${it.id}, State=${it.state}, Attempts=${it.runAttemptCount}" 
                }
                callback.invoke(status)
            }
    }

    private fun createConstraints() = Constraints.Builder()
        .setRequiredNetworkType(NetworkType.CONNECTED)
        .setRequiresBatteryNotLow(true)
        .setRequiresCharging(false)
        .build()
}