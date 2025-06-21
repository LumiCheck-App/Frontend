package com.anonymous.lumicheck
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.provider.Settings
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class FloatingBubbleModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
    
    override fun getName(): String = "FloatingBubble"
    
    @ReactMethod
    fun requestPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(reactApplicationContext)) {
            val intent = Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION)
            intent.data = Uri.parse("package:${reactApplicationContext.packageName}")
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            reactApplicationContext.startActivity(intent)
        }
    }
    
    @ReactMethod
    fun showBubble() {
        val intent = Intent(reactApplicationContext, FloatingBubbleService::class.java)
        reactApplicationContext.startService(intent)
    }
    
    @ReactMethod
    fun hideBubble() {
        val intent = Intent(reactApplicationContext, FloatingBubbleService::class.java)
        reactApplicationContext.stopService(intent)
    }
    
    @ReactMethod
    fun showMessage(message: String) {
        val intent = Intent(reactApplicationContext, FloatingBubbleService::class.java)
        intent.putExtra("message", message)
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        reactApplicationContext.startService(intent)
    }
    
    @ReactMethod
    fun checkOverlayPermission(promise: Promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            val hasPermission = Settings.canDrawOverlays(reactApplicationContext)
            promise.resolve(hasPermission)
        } else {
            // For versions below Android M, overlay permission is automatically granted
            promise.resolve(true)
        }
    }
}