package com.mido.auth.utilis;

import javax.xml.bind.DatatypeConverter;
import java.io.*;

public class Utils {

    public static String saveImage(String basse64, String imageName){
        String[] strings = basse64.split(",");
        String extension;
        switch (strings[0]) {//check image's extension
            case "data:image/jpeg;base64":
                extension = "jpeg";
                break;
            case "data:image/png;base64":
                extension = "png";
                break;
            default://should write cases for more images types
                extension = "jpg";
                break;
        }

        byte[] data = DatatypeConverter.parseBase64Binary(strings[1]);
        String path = "src\\main\\media\\"+imageName+"."+ extension;
        File file = new File(path);
        try (OutputStream outputStream = new BufferedOutputStream(new FileOutputStream(file))) {
            outputStream.write(data);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return imageName+"."+ extension;
    }
}
