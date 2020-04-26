import java.util.*;
public class ManavClient {
    public static void main(String[] args) {
        String name;
        int weight;
        int height;
        Scanner scan = new Scanner(System.in);
        System.out.println("Enter name:");
        name = scan.nextLine();
        System.out.println("Enter weight(in pounds):");
        weight = scan.nextInt();
        System.out.println("Enter height (in inches):");
        height = scan.nextInt();

        double bmi = 703 * (weight / Math.pow(height,2));
        
        if (bmi < 18.5 && bmi > 0) {
            boolean underweight = true;
            System.out.println("Oh no you are underweight. Let's make you healthy!");
        }
        if (bmi > 18.5 && bmi < 24.9){
            boolean healthy = true;
            System.out.println("You're healthy! Let's try and maintain it");
        }
        if (bmi > 24.9 && bmi < 29.9){
            boolean overweight = true;
            System.out.println("You are overweight. Here's how you can try to be more healthy");
        }
        else {
            boolean obese = true;
            System.out.println("You are in the obese range. Let's try to be more fit!");
        }
        
        



    }
}
