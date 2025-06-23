package com.anonymous.lumicheck

import android.app.Service
import android.content.Intent
import android.graphics.PixelFormat
import android.os.Handler
import android.os.IBinder
import android.os.Looper
import android.view.*
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import kotlin.math.hypot

class FloatingBubbleService : Service() {

    private var windowManager: WindowManager? = null
    private var bubbleView: View? = null
    private var closeView: View? = null
    private lateinit var params: WindowManager.LayoutParams
    private lateinit var closeParams: WindowManager.LayoutParams

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onCreate() {
        super.onCreate()
        setupBubble()
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val message = intent?.getStringExtra("message")
        message?.let {
            showMessage(it)
        }
        return START_STICKY
    }

    private fun setupBubble() {
        val inflater = getSystemService(LAYOUT_INFLATER_SERVICE) as LayoutInflater
        bubbleView = inflater.inflate(R.layout.bubble_layout, null)

        val bubbleIcon = bubbleView?.findViewById<ImageView>(R.id.bubble_icon)

        params = WindowManager.LayoutParams(
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.WRAP_CONTENT,
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O)
                WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
            else
                WindowManager.LayoutParams.TYPE_PHONE,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
            PixelFormat.TRANSLUCENT
        )

        params.gravity = Gravity.TOP or Gravity.START
        params.x = 0
        params.y = 100

        windowManager = getSystemService(WINDOW_SERVICE) as WindowManager
        windowManager?.addView(bubbleView, params)

        setupCloseView(inflater)

        // Click listener para abrir a app
        bubbleIcon?.setOnClickListener {
            openApp()
        }

        bubbleIcon?.setOnTouchListener(object : View.OnTouchListener {
            private var initialX = 0
            private var initialY = 0
            private var initialTouchX = 0f
            private var initialTouchY = 0f
            private var isDragging = false

            override fun onTouch(v: View?, event: MotionEvent): Boolean {
                when (event.action) {
                    MotionEvent.ACTION_DOWN -> {
                        initialX = params.x
                        initialY = params.y
                        initialTouchX = event.rawX
                        initialTouchY = event.rawY
                        isDragging = false
                        closeView?.visibility = View.VISIBLE
                        return true
                    }

                    MotionEvent.ACTION_MOVE -> {
                        val deltaX = (event.rawX - initialTouchX).toInt()
                        val deltaY = (event.rawY - initialTouchY).toInt()
                        
                        // Considerar dragging se moveu mais de 10 pixels
                        if (kotlin.math.abs(deltaX) > 10 || kotlin.math.abs(deltaY) > 10) {
                            isDragging = true
                        }
                        
                        params.x = initialX + deltaX
                        params.y = initialY + deltaY
                        windowManager?.updateViewLayout(bubbleView, params)
                        return true
                    }

                    MotionEvent.ACTION_UP -> {
                        closeView?.visibility = View.GONE
                        if (isOverCloseArea()) {
                            stopSelf()
                        } else {
                            snapToEdge(params)
                        }
                        
                        // Se não estava a fazer drag, é um click
                        if (!isDragging) {
                            v?.performClick()
                            Handler(Looper.getMainLooper()).postDelayed({
                                stopSelf()
                            }, 1000)
                        }
                        return true
                    }
                }
                return false
            }
        })
    }

    private fun openApp() {
        try {
            // Opção 1: Usar Deep Link (recomendado)
            val deepLinkIntent = Intent(Intent.ACTION_VIEW)
            deepLinkIntent.data = android.net.Uri.parse("exp+lumicheck://question-page")
            deepLinkIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP)
            startActivity(deepLinkIntent)
            
        } catch (e: Exception) {
            // Fallback: abrir a app normalmente
            val launchIntent = packageManager.getLaunchIntentForPackage(packageName)
            launchIntent?.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP)
            startActivity(launchIntent)
        }
    }

    private fun setupCloseView(inflater: LayoutInflater) {
        closeView = inflater.inflate(R.layout.x_close_layout, null)
        closeParams = WindowManager.LayoutParams(
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.WRAP_CONTENT,
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O)
                WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
            else
                WindowManager.LayoutParams.TYPE_PHONE,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
            PixelFormat.TRANSLUCENT
        ).apply {
            gravity = Gravity.BOTTOM or Gravity.CENTER_HORIZONTAL
            y = 100
        }

        closeView?.visibility = View.GONE
        windowManager?.addView(closeView, closeParams)
    }

    private fun isOverCloseArea(): Boolean {
        val bubbleLoc = IntArray(2)
        val closeLoc = IntArray(2)
        bubbleView?.getLocationOnScreen(bubbleLoc)
        closeView?.getLocationOnScreen(closeLoc)

        val bubbleCenterX = bubbleLoc[0] + (bubbleView?.width ?: 0) / 2
        val bubbleCenterY = bubbleLoc[1] + (bubbleView?.height ?: 0) / 2
        val closeCenterX = closeLoc[0] + (closeView?.width ?: 0) / 2
        val closeCenterY = closeLoc[1] + (closeView?.height ?: 0) / 2

        val distance = hypot(
            (bubbleCenterX - closeCenterX).toDouble(),
            (bubbleCenterY - closeCenterY).toDouble()
        )

        return distance < 150 // pixels threshold to consider it "over" the X
    }

    private fun showMessage(message: String) {
        val messageTextView = bubbleView?.findViewById<TextView>(R.id.bubble_message)
        messageTextView?.apply {
            text = message
            alpha = 0f
            visibility = View.VISIBLE
            animate().alpha(1f).setDuration(200).start()
        }

        Handler(Looper.getMainLooper()).postDelayed({
            messageTextView?.visibility = View.GONE
        }, 3000)
    }

    private fun snapToEdge(params: WindowManager.LayoutParams) {
        val displayMetrics = resources.displayMetrics
        val screenWidth = displayMetrics.widthPixels
        val bubbleWidth = bubbleView?.width ?: 0

        val middle = screenWidth / 2
        val targetX = if (params.x < middle) 0 else screenWidth - bubbleWidth

        val handler = Handler(Looper.getMainLooper())
        val startX = params.x
        val distance = targetX - startX
        val duration = 300L
        val startTime = System.currentTimeMillis()

        handler.post(object : Runnable {
            override fun run() {
                val elapsed = System.currentTimeMillis() - startTime
                val progress = (elapsed.toFloat() / duration).coerceAtMost(1f)
                params.x = startX + (distance * progress).toInt()
                windowManager?.updateViewLayout(bubbleView, params)

                if (progress < 1f) {
                    handler.postDelayed(this, 16)
                }
            }
        })
    }

    override fun onDestroy() {
        super.onDestroy()
        if (bubbleView != null) {
            windowManager?.removeView(bubbleView)
        }
        if (closeView != null) {
            windowManager?.removeView(closeView)
        }
    }
}