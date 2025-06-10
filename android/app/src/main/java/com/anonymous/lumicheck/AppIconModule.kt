package com.anonymous.lumicheck

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactContextBaseJavaModule

class AppIconModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "AppIconModule"
    }

    @ReactMethod
    fun getAppIcon(packageName: String, promise: Promise) {
        val iconBase64 = AppIconHelper.getAppIconBase64(reactApplicationContext, packageName)
        if (iconBase64 != null) {
            promise.resolve(iconBase64)
        } else {
            promise.reject("ERROR", "App icon not found")
        }
    }
}
