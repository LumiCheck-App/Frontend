package com.anonymous.lumicheck

import android.content.Context
import androidx.work.Worker
import androidx.work.WorkerParameters
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody
import android.util.Log
import org.json.JSONObject
import androidx.work.ListenableWorker

class MyWorker(val context: Context, workerParams: WorkerParameters) : Worker(context, workerParams) {

    override fun doWork(): ListenableWorker.Result {
        val screenTimeResult = ScreenTimeUtil.getScreenTime(context)

        val totalMinutes = screenTimeResult.totalScreenTimeMinutes
        val appBreakdown = screenTimeResult.appScreenTime
        .filter { it.value >= 1 }
        .entries
        .joinToString("\n") {
            "📱 ${it.key}: ${"%.1f".format(it.value)} min"
        }
        .ifEmpty { "No apps used more than 1 minute today." }

        val message = """
            ✅ Daily Screen Time Summary:
            • Total screen time: ${"%.1f".format(totalMinutes)} min
            
            🔍 App Breakdown:
            $appBreakdown
        """.trimIndent()

        Log.d("MyWorker", "✅ Worker sending message:\n$message")
        sendDiscordMessage(message)
        return ListenableWorker.Result.success()
    }

    private fun sendDiscordMessage(message: String) {
        val client = OkHttpClient()
        val webhookUrl = "https://discord.com/api/webhooks/1347573758763864156/nE9Xk6JBj41QNzKrIvlBlqGYjsrR_Wf_7lUR_NwysRG_X21e4edB8b1OI2oJ5EBhqdmm" // Replace yours

        
        val jsonBody = JSONObject().put("content", message).toString()
        val body = RequestBody.create("application/json".toMediaTypeOrNull(), jsonBody)
        val request = Request.Builder()
            .url(webhookUrl)
            .post(body)
            .build()

        client.newCall(request).execute().use { response ->
            Log.d("MyWorker", "✅ Discord Response: ${response.body?.string()}")
        }
    }
}
