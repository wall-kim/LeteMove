/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd. All rights reserved. 
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that 
 * the following conditions are met:
 * 
 *     * Redistributions of source code must retain the above copyright notice, 
 *       this list of conditions and the following disclaimer. 
 *     * Redistributions in binary form must reproduce the above copyright notice, 
 *       this list of conditions and the following disclaimer in the documentation and/or 
 *       other materials provided with the distribution. 
 *     * Neither the name of Samsung Electronics Co., Ltd. nor the names of its contributors may be used to endorse
 *       or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

package com.glTron.Game;

import android.content.Intent;
import android.os.Binder;
import android.os.Handler;
import android.os.IBinder;
import android.util.Log;
import android.view.MotionEvent;
import android.widget.Toast;

import com.glTron.OpenGLView;
import com.glTron.glTron;
import com.samsung.android.sdk.SsdkUnsupportedException;
import com.samsung.android.sdk.accessory.*;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;

public class ProviderService extends SAAgent {
    private static final String TAG = "GlTron(P)";
    private static final int GLTRON_CHANNEL_ID = 104;
    private static final Class<ServiceConnection> SASOCKET_CLASS = ServiceConnection.class;
    private final IBinder mBinder = new LocalBinder();
    private ServiceConnection mConnectionHandler = null;
    Handler mHandler = new Handler();


    //public final static int BIG_EDIAN = 1;
    //public final static int Little_EDIAN = 2;

    public ProviderService() {
        super(TAG, SASOCKET_CLASS);
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SA mAccessory = new SA();
        try {
            mAccessory.initialize(this);
        } catch (SsdkUnsupportedException e) {
            // try to handle SsdkUnsupportedException
            if (processUnsupportedException(e) == true) {
                return;
            }
        } catch (Exception e1) {
            e1.printStackTrace();
            /*
             * Your application can not use Samsung Accessory SDK. Your application should work smoothly
             * without using this SDK, or you may want to notify user and close your application gracefully
             * (release resources, stop Service threads, close UI thread, etc.)
             */
            stopSelf();
        }
    }

    @Override
    public IBinder onBind(Intent intent) {
        return mBinder;
    }

    @Override
    protected void onFindPeerAgentsResponse(SAPeerAgent[] peerAgents, int result) {
        Log.d(TAG, "onFindPeerAgentResponse : result =" + result);
    }

    @Override
    protected void onServiceConnectionRequested(SAPeerAgent peerAgent) {
        if (peerAgent != null) {
            Toast.makeText(getBaseContext(), "Connection Accepted", Toast.LENGTH_SHORT).show();
            acceptServiceConnectionRequest(peerAgent);
        }
    }

    @Override
    protected void onServiceConnectionResponse(SAPeerAgent peerAgent, SASocket socket, int result) {
        if (result == SAAgent.CONNECTION_SUCCESS) {
            if (socket != null) {
                mConnectionHandler = (ServiceConnection) socket;
            }
        } else if (result == SAAgent.CONNECTION_ALREADY_EXIST) {
            Log.e(TAG, "onServiceConnectionResponse, CONNECTION_ALREADY_EXIST");
        }
    }

    @Override
    protected void onAuthenticationResponse(SAPeerAgent peerAgent, SAAuthenticationToken authToken, int error) {
        /*
         * The authenticatePeerAgent(peerAgent) API may not be working properly depending on the firmware
         * version of accessory device. Please refer to another sample application for Security.
         */
    }

    @Override
    protected void onError(SAPeerAgent peerAgent, String errorMessage, int errorCode) {
        super.onError(peerAgent, errorMessage, errorCode);
    }

    private boolean processUnsupportedException(SsdkUnsupportedException e) {
        e.printStackTrace();
        int errType = e.getType();
        if (errType == SsdkUnsupportedException.VENDOR_NOT_SUPPORTED
                || errType == SsdkUnsupportedException.DEVICE_NOT_SUPPORTED) {
            /*
             * Your application can not use Samsung Accessory SDK. You application should work smoothly
             * without using this SDK, or you may want to notify user and close your app gracefully (release
             * resources, stop Service threads, close UI thread, etc.)
             */
            stopSelf();
        } else if (errType == SsdkUnsupportedException.LIBRARY_NOT_INSTALLED) {
            Log.e(TAG, "You need to install Samsung Accessory SDK to use this application.");
        } else if (errType == SsdkUnsupportedException.LIBRARY_UPDATE_IS_REQUIRED) {
            Log.e(TAG, "You need to update Samsung Accessory SDK to use this application.");
        } else if (errType == SsdkUnsupportedException.LIBRARY_UPDATE_IS_RECOMMENDED) {
            Log.e(TAG, "We recommend that you update your Samsung Accessory SDK before using this application.");
            return false;
        }
        return true;
    }

    public class LocalBinder extends Binder {
        public ProviderService getService() {
            return ProviderService.this;
        }
    }

    public class ServiceConnection extends SASocket {



        public ServiceConnection() {
            super(ServiceConnection.class.getName());
        }

        @Override
        public void onError(int channelId, String errorMessage, int errorCode) {
        }

        @Override
        public void onReceive(int channelId, byte[] data) {
            if (mConnectionHandler == null) {
                return;
            }



            Log.i("Data Length", Integer.toString(data.length));

            if(data.length == 1){
                GLTronGame.inputDirection = GLTronGame.Players[GLTronGame.OWN_PLAYER].TURN_LEFT;
                GLTronGame.Players[GLTronGame.OWN_PLAYER].doTurn(GLTronGame.inputDirection, GLTronGame.TimeCurrent);
            } else if(data.length == 2){
                GLTronGame.inputDirection = GLTronGame.Players[GLTronGame.OWN_PLAYER].TURN_RIGHT;
                GLTronGame.Players[GLTronGame.OWN_PLAYER].doTurn(GLTronGame.inputDirection, GLTronGame.TimeCurrent);
            } else if(data.length == 3){
                glTron._View.onTouchEvent(null);
            }
        }

        @Override
        protected void onServiceConnectionLost(int reason) {
            mConnectionHandler = null;
            mHandler.post(new Runnable() {
                @Override
                public void run() {
                    Toast.makeText(getBaseContext(), "Connection Terminated", Toast.LENGTH_SHORT).show();
                }
            });
        }
    }

    /**
     * @param Value int로 변환할 바이트 배열
     * @param Order BIG_EDIAN,Little_EDIAN 변수에 적용되어 있음
     * @return int
     */
    /*public int BytesToInt(byte[] Value,int Order)
    {
        ByteBuffer buff = ByteBuffer.allocate(4);
        buff = ByteBuffer.wrap(Value);

        if(Order == BIG_EDIAN) buff.order(ByteOrder.BIG_ENDIAN);
        else if(Order == Little_EDIAN) buff.order(ByteOrder.LITTLE_ENDIAN);
        return  buff.getInt();
    }*/

    /**
     * @param oridata 읽을 바이트 배열
     * @param start 읽을 바이트의  시작점
     * @param len 읽을 바이트 배열 길이
     * @param Order BIG_EDIAN,Little_EDIAN 변수에 적용되어 있음
     * @return int
     */
    /*public int BytesToInt(byte[] oridata,int start,int len,int Order)
    {
        byte[] temp = new byte[len];
        System.arraycopy(oridata,start,temp,0,len);
        ByteBuffer buff = ByteBuffer.allocate(4);
        buff = ByteBuffer.wrap(temp);

        if(Order == BIG_EDIAN) buff.order(ByteOrder.BIG_ENDIAN);
        else if(Order == Little_EDIAN) buff.order(ByteOrder.LITTLE_ENDIAN);
        return  buff.getInt();
    }*/
}
