package com.anonymous.lumicheck

import android.app.usage.UsageEvents
import android.app.usage.UsageStatsManager
import android.content.Context
import android.content.Intent
import android.os.Build
import android.provider.Settings
import android.util.Log
import com.facebook.react.bridge.*
import java.util.Calendar

class ScreenTimeModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ScreenTimeModule"
    }

    @ReactMethod
    fun getScreenTime(promise: Promise) {
        val context = reactApplicationContext

        if (!isUsageAccessGranted(context)) {
            promise.reject("PERMISSION_DENIED", "Usage access permission not granted")
            return
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            val usageStatsManager = context.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
            val calendar = Calendar.getInstance()

            // Define the time range: 00:00 to now
            val endTime = calendar.timeInMillis
            calendar.set(Calendar.HOUR_OF_DAY, 0)
            calendar.set(Calendar.MINUTE, 0)
            calendar.set(Calendar.SECOND, 0)
            calendar.set(Calendar.MILLISECOND, 0)
            val startTime = calendar.timeInMillis

            val usageEvents = usageStatsManager.queryEvents(startTime, endTime)

            var totalScreenTime: Long = 0
            val appScreenTime: MutableMap<String, Long> = mutableMapOf()
            val activeSessions: MutableMap<String, Long> = mutableMapOf()

            while (usageEvents.hasNextEvent()) {
                val event = UsageEvents.Event()
                usageEvents.getNextEvent(event)

                val packageName = event.packageName

                when (event.eventType) {
                    UsageEvents.Event.ACTIVITY_RESUMED -> {
                        // App is opened
                        activeSessions[packageName] = event.timeStamp
                    }

                    UsageEvents.Event.ACTIVITY_PAUSED -> {
                        // App is closed/minimized
                        if (activeSessions.containsKey(packageName)) {
                            val duration = event.timeStamp - activeSessions[packageName]!!
                            totalScreenTime += duration
                            appScreenTime[packageName] = appScreenTime.getOrDefault(packageName, 0) + duration
                            activeSessions.remove(packageName)
                        }
                    }
                }
            }

            // Convert milliseconds to minutes
            val totalScreenTimeMinutes = totalScreenTime / (1000 * 60)
            val result: WritableMap = Arguments.createMap()
            result.putDouble("screenTimeMinutes", totalScreenTimeMinutes.toDouble())
            result.putDouble("screenTimeHours", totalScreenTimeMinutes / 60.0)

            val appUsageMap: WritableMap = Arguments.createMap()
            for ((app, time) in appScreenTime) {
                appUsageMap.putDouble(app, (time / (1000 * 60)).toDouble())
            }
            result.putMap("appScreenTime", appUsageMap)

            promise.resolve(result)
        } else {
            promise.reject("ERROR", "Not supported on this Android version")
        }
    }

    @ReactMethod
    fun requestUsageAccess() {
        val intent = Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS)
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        reactApplicationContext.startActivity(intent)
    }

    private fun isUsageAccessGranted(context: Context): Boolean {
        return try {
            val packageManager = context.packageManager
            val applicationInfo = packageManager.getApplicationInfo(context.packageName, 0)
            val appOps = context.getSystemService(Context.APP_OPS_SERVICE) as android.app.AppOpsManager
            val mode = appOps.checkOpNoThrow(
                android.app.AppOpsManager.OPSTR_GET_USAGE_STATS,
                applicationInfo.uid,
                applicationInfo.packageName
            )
            mode == android.app.AppOpsManager.MODE_ALLOWED
        } catch (e: Exception) {
            false
        }
    }
}
