import javax.swing.JFrame;
import javax.swing.JTextField;
import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.*;
import java.awt.*;
 
public class menuPage extends JFrame{
    static int FrameWidth = 1000;
    static int FrameHeight = 800;
    JPanel jp = new JPanel();
    JLabel height = new JLabel();
    JLabel weight = new JLabel();
    
    JLabel label1 = new JLabel("Height in Inches:");
    JLabel label2 = new JLabel("Weight in Pounds:");

    JTextField jt1 = new JTextField("", 30);
    JTextField jt2 = new JTextField("", 30);
    JButton jb = new JButton("Enter");

    public menuPage(){
        setTitle("menuPage");
        setVisible(true);
        setSize(FrameWidth,FrameHeight);
        setDefaultCloseOperation(EXIT_ON_CLOSE);

        jp.add(Box.createRigidArea(new Dimension(0, 300)));
        jp.add(label1);
        jp.add(jt1);
        jp.add(Box.createRigidArea(new Dimension(5000, 0)));
        jp.add(label2);
        jp.add(jt2);
        jp.add(Box.createRigidArea(new Dimension(5000, 0)));
        jp.add(jb);

        jb.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                String input1 = jt1.getText();
                height.setText(input1);
                String input2 = jt2.getText();
                weight.setText(input2);
                System.out.println("beep boop i have been pressed");
            }
        });

        add(jp);
    }

    public static void main(String[]args){
        menuPage page = new menuPage();
    }
}