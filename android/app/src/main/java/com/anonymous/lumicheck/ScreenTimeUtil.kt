package com.anonymous.lumicheck

import android.app.usage.UsageEvents
import android.app.usage.UsageStatsManager
import android.content.Context
import java.util.Calendar

data class ScreenTimeResult(
    val totalScreenTimeMinutes: Double,
    val appScreenTime: Map<String, Double>
)

object ScreenTimeUtil {
    fun getScreenTime(context: Context): ScreenTimeResult {
        val usageStatsManager = context.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
        val calendar = Calendar.getInstance()

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
                    activeSessions[packageName] = event.timeStamp
                }
                UsageEvents.Event.ACTIVITY_PAUSED -> {
                    activeSessions[packageName]?.let { startTimeStamp ->
                        val duration = event.timeStamp - startTimeStamp
                        totalScreenTime += duration
                        appScreenTime[packageName] = appScreenTime.getOrDefault(packageName, 0) + duration
                        activeSessions.remove(packageName)
                    }
                }
            }
        }

        val totalMinutes = (totalScreenTime / (1000 * 60)).toDouble()
        val appScreenTimeInMinutes = appScreenTime.mapValues { it.value / (1000 * 60).toDouble() }

        return ScreenTimeResult(
            totalScreenTimeMinutes = totalMinutes,
            appScreenTime = appScreenTimeInMinutes
        )
    }
}
