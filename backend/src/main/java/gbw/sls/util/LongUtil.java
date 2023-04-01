package gbw.sls.util;

//Imported from own project: "TheScheduler"
public class LongUtil {

    public static Long parseOr(String value, long onFailure){
        try{
            return Long.parseLong(value);
        }catch (NumberFormatException | NullPointerException e){
            return onFailure;
        }
    }

}
