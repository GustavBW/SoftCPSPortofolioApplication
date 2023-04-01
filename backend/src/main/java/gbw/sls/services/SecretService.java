package gbw.sls.services;

import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

@Service
public class SecretService implements ISecretService{

    private String cachedToken = null;

    @Override
    public String getAuthToken() {
        if(cachedToken != null) return cachedToken;

        try{
            BufferedReader br = new BufferedReader(new FileReader("secrets.txt"));
            cachedToken = br.readLine();
        } catch (IOException ignored) {
            System.err.println("Unable to locate and/or read secrets.txt at project root");
        }

        if(cachedToken == null){
            System.err.println("secrets.txt did not contain anything");
        }

        return cachedToken;
    }
}
