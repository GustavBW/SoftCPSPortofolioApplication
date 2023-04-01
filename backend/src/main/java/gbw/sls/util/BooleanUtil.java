package gbw.sls.util;


import static gbw.sls.util.ArrayUtil.contains;

//Imported from own project: "TheScheduler"
public class BooleanUtil {

    public static final String[] FALSES = {
            "no","off","false","f","0"
    };
    public static final String[] TRUES = {
            "true","yes","t","1","on"
    };

    public static boolean parseOr(String s, boolean state){
        if(contains(FALSES,s.trim().toLowerCase())){
            return false;
        }else if(contains(TRUES,s.trim().toLowerCase())){
            return true;
        }

        return state;
    }

}
