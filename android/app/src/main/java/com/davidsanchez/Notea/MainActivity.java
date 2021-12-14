package com.davidsanchez.Notea;

import com.getcapacitor.BridgeActivity;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
import android.os.Bundle;
import com.capacitorjs.plugins.storage.StoragePlugin;

public class MainActivity extends BridgeActivity {
    
    @Override
    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);

        //aquil los plugin no oficiales.


        registerPlugin(GoogleAuth.class);
        registerPlugin(StoragePlugin.class);
    }

}
