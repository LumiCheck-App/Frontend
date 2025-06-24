package com.anonymous.lumicheck

import android.content.Context
import android.net.ConnectivityManager
import android.os.BatteryManager
import android.content.IntentFilter
import android.content.Intent
import androidx.work.*
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import android.util.Log
import org.json.JSONObject
import java.util.concurrent.TimeUnit

class MyWorker(context: Context, workerParams: WorkerParameters) : Worker(context, workerParams) {

    private val prefs = applicationContext.getSharedPreferences("LumiCheckPrefs", Context.MODE_PRIVATE)
    private val client = OkHttpClient.Builder()
        .connectTimeout(30, TimeUnit.SECONDS)
        .readTimeout(30, TimeUnit.SECONDS)
        .build()

    override fun doWork(): Result {
        return try {
            val userId = prefs.getInt("USER_ID", -1).takeIf { it != -1 } 
                ?: return Result.success()
            
            val token = prefs.getString("AUTH_TOKEN", null)
                ?: return Result.success()

            val screenData = getScreenTimeData()
            val success = sendToApi(userId, token, screenData)

            if (success) Result.success() else Result.retry()
        } catch (e: Exception) {
            Log.e("MyWorker", "Erro no worker", e)
            Result.retry()
        }
    }

    private fun getScreenTimeData(): ScreenTimeData {
        return ScreenTimeUtil.getScreenTime(applicationContext).let {
            ScreenTimeData(
                totalMinutes = it.totalScreenTimeMinutes.toFloat(),
                appBreakdown = it.appScreenTime
                    .filterValues { time -> time >= 1 }
                    .mapValues { entry -> entry.value.toFloat() }
            )
        }
    }

    private fun sendToApi(userId: Int, token: String, data: ScreenTimeData): Boolean {
        return try {
            val jsonBody = createRequestBody(userId, data)
            val request = Request.Builder()
                .url("https://king-prawn-app-3re4n.ondigitalocean.app/screentime/")
                .post(jsonBody)
                .addHeader("Content-Type", "application/json")
                .addHeader("Authorization", "Bearer ${token}")
                .build()

            client.newCall(request).execute().use { response ->
                response.isSuccessful
            }
        } catch (e: Exception) {
            false
        }
    }

    private fun createRequestBody(userId: Int, data: ScreenTimeData): RequestBody {
        val usageData = JSONObject().apply {
            put("total_minutes", data.totalMinutes)
            put("app_breakdown", JSONObject(data.appBreakdown))
        }

        val payload = JSONObject().apply {
            put("id_user", userId)
            put("usage_data", usageData)
        }.toString()

        return RequestBody.create("application/json".toMediaTypeOrNull(), payload)
    }

    private data class ScreenTimeData(
        val totalMinutes: Float,
        val appBreakdown: Map<String, Float>
    )
}