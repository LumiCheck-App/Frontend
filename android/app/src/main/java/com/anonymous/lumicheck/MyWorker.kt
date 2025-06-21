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
        Log.d("MyWorker", "🚀 Iniciando trabalho...")
        logDeviceStatus()

        return try {
            val userId = prefs.getInt("USER_ID", -1).takeIf { it != -1 } 
                ?: return Result.success().also { 
                    Log.d("MyWorker", "⏭️ Nenhum usuário logado") 
                }

            val screenData = getScreenTimeData()
            val success = sendToApi(userId, screenData)

            if (success) Result.success() else Result.retry()
        } catch (e: Exception) {
            Log.e("MyWorker", "Erro crítico", e)
            Result.retry()
        }
    }

    private fun getScreenTimeData(): ScreenTimeData {
        return try {
            ScreenTimeUtil.getScreenTime(applicationContext).let {
                ScreenTimeData(
                    totalMinutes = it.totalScreenTimeMinutes.toFloat(),
                    appBreakdown = it.appScreenTime
                        .filterValues { time -> time >= 1 }
                        .mapValues { entry -> entry.value.toFloat() }
                )
            }
        } catch (e: Exception) {
            Log.e("MyWorker", "Erro ao obter tempo de tela", e)
            throw e
        }
    }

    private fun sendToApi(userId: Int, data: ScreenTimeData): Boolean {
        return try {
            val jsonBody = createRequestBody(userId, data)
            val request = Request.Builder()
                .url("https://king-prawn-app-3re4n.ondigitalocean.app/screentime/")
                .post(jsonBody)
                .addHeader("Content-Type", "application/json")
                .build()

            client.newCall(request).execute().use { response ->
                if (!response.isSuccessful) {
                    Log.w("MyWorker", "Falha na API: ${response.code} - ${response.message}")
                    return false
                }
                Log.d("MyWorker", "✅ Dados enviados com sucesso!")
                true
            }
        } catch (e: Exception) {
            Log.e("MyWorker", "Erro na comunicação com API", e)
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

        Log.d("MyWorker", "📦 Payload: $payload")
        return RequestBody.create("application/json".toMediaTypeOrNull(), payload)
    }

    private fun logDeviceStatus() {
        val connManager = applicationContext.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val isOnline = connManager.activeNetworkInfo?.isConnected == true

        val batteryStatus = applicationContext.registerReceiver(null, 
            IntentFilter(Intent.ACTION_BATTERY_CHANGED))
        val batteryLevel = batteryStatus?.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) ?: -1

        Log.d("MyWorker", "📱 Status: " +
            "Online=$isOnline, " +
            "Bateria=$batteryLevel%, " +
            "Carregando=${batteryStatus?.getIntExtra(BatteryManager.EXTRA_PLUGGED, -1) != 0}")
    }

    private data class ScreenTimeData(
        val totalMinutes: Float,
        val appBreakdown: Map<String, Float>
    )
}