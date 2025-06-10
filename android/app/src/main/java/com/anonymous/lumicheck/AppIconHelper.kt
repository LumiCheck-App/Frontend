package com.anonymous.lumicheck

import android.util.Log
import android.content.Context
import android.content.pm.ApplicationInfo
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.drawable.AdaptiveIconDrawable
import android.graphics.drawable.BitmapDrawable
import android.graphics.drawable.Drawable
import android.util.Base64
import java.io.ByteArrayOutputStream

object AppIconHelper {
    fun getAppIconBase64(context: Context, packageName: String): String? {
    return try {
        val pm: PackageManager = context.packageManager
        val appInfo: ApplicationInfo = pm.getApplicationInfo(packageName, PackageManager.GET_META_DATA)
        val drawable: Drawable = pm.getApplicationIcon(appInfo)

        Log.d("AppIconHelper", "Fetching icon for: $packageName") // ✅ Log app package

        val bitmap: Bitmap = drawableToBitmap(drawable)
        val outputStream = ByteArrayOutputStream()
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, outputStream)
        val byteArray: ByteArray = outputStream.toByteArray()
        Base64.encodeToString(byteArray, Base64.DEFAULT)
    } catch (e: PackageManager.NameNotFoundException) {
        Log.e("AppIconHelper", "Package not found: $packageName") // ❌ Log missing package
        null
    } catch (e: Exception) {
        Log.e("AppIconHelper", "Error fetching icon for $packageName: ${e.message}")
        null
    }
}

    fun drawableToBitmap(drawable: Drawable): Bitmap {
    return when (drawable) {
        is BitmapDrawable -> drawable.bitmap
        is AdaptiveIconDrawable -> {
            val bitmap = Bitmap.createBitmap(108, 108, Bitmap.Config.ARGB_8888) // Larger size for adaptive icons
            val canvas = Canvas(bitmap)
            drawable.setBounds(0, 0, canvas.width, canvas.height)
            drawable.draw(canvas)
            bitmap
        }
        else -> {
            val bitmap = Bitmap.createBitmap(100, 100, Bitmap.Config.ARGB_8888)
            val canvas = Canvas(bitmap)
            drawable.setBounds(0, 0, canvas.width, canvas.height)
            drawable.draw(canvas)
            bitmap
        }
    }
}

}
