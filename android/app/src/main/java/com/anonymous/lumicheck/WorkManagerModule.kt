package com.anonymous.lumicheck

import android.content.Context
import androidx.work.*
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.util.Log
import java.util.Calendar
import java.util.concurrent.TimeUnit

class WorkManagerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "WorkManagerModule"
    }

    @ReactMethod
    fun startWork() {
        val now = Calendar.getInstance()
        val nextRun = Calendar.getInstance().apply {
            set(Calendar.HOUR_OF_DAY, 23) // ✅ Runs at 23:59
            set(Calendar.MINUTE, 59)
            set(Calendar.SECOND, 0)

            if (now.after(this)) {
                add(Calendar.DAY_OF_YEAR, 1) // ✅ If it's past 23:59 today, schedule for tomorrow
            }
        }

        val initialDelay = nextRun.timeInMillis - now.timeInMillis // ✅ Calculate time until 23:59

        val workRequest = OneTimeWorkRequestBuilder<MyWorker>()
            .setInitialDelay(initialDelay, TimeUnit.MILLISECONDS) // ✅ First execution delay
            .setConstraints(
                Constraints.Builder()
                    .setRequiresBatteryNotLow(true)
                    .setRequiresCharging(false)
                    .build()
            )
            .build()

        WorkManager.getInstance(reactApplicationContext)
            .enqueueUniqueWork(
                "discord_worker",
                ExistingWorkPolicy.REPLACE,
                workRequest
            )

        Log.d("WorkManagerModule", "✅ WorkManager scheduled! First run in $initialDelay ms")
    }
}
