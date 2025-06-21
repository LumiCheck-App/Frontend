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
        Log.d("WorkManagerModule", "🆔 User ID set: $userId")
    }

    @ReactMethod
    fun testConnection(message: String, callback: Callback) {
        Log.d("WorkManagerModule", "📢 Mensagem recebida: $message")
        callback.invoke("Kotlin recebeu: $message")
    }

    @ReactMethod
    fun startWork() {
        try {
            val now = Calendar.getInstance()
            val nextRun = Calendar.getInstance().apply {
                set(Calendar.HOUR_OF_DAY, 23)
                set(Calendar.MINUTE, 25)
                set(Calendar.SECOND, 0)
                if (now.after(this)) add(Calendar.DAY_OF_YEAR, 1)
            }

            val initialDelay = nextRun.timeInMillis - now.timeInMillis
            Log.d("WorkManagerModule", "⏳ Agendando para ${nextRun.time} (delay: ${initialDelay/1000}s)")

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

    @ReactMethod
    fun runWorkerNow(callback: Callback) {
        val workRequest = OneTimeWorkRequestBuilder<MyWorker>()
            .setInitialDelay(0, TimeUnit.MILLISECONDS)
            .build()
        
        WorkManager.getInstance(reactApplicationContext)
            .enqueue(workRequest)
            .result.addListener({
                callback.invoke("Worker executado com sucesso")
            }, ContextCompat.getMainExecutor(reactApplicationContext))
    }

    private fun createConstraints() = Constraints.Builder()
        .setRequiredNetworkType(NetworkType.CONNECTED)
        .setRequiresBatteryNotLow(true)
        .setRequiresCharging(false)
        .build()
}