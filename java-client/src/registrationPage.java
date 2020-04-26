import javax.swing.JFrame;
import javax.swing.JTextField;
import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.*;
import java.awt.*;

public class registrationPage extends JFrame{
    static int FrameWidth = 1000;
    static int FrameHeight = 800;
    JPanel jp = new JPanel();
    JLabel first = new JLabel();
    JLabel last = new JLabel();
    JLabel email = new JLabel();
    JLabel user = new JLabel();
    JLabel pass = new JLabel();

    JLabel label1 = new JLabel("First Name");
    JLabel label2 = new JLabel("Last Name");
    JLabel label3 = new JLabel("Email");
    JLabel label4 = new JLabel("Username");
    JLabel label5 = new JLabel("Password");
    JLabel label6 = new JLabel("Confirm Password");

    JTextField jt1 = new JTextField("", 30);
    JTextField jt2 = new JTextField("", 30);
    JTextField jt3 = new JTextField("", 30);
    JTextField jt4 = new JTextField("", 30);
    JPasswordField jt5 = new JPasswordField("", 30);
    JPasswordField jt6 = new JPasswordField("", 30);
    JButton jb = new JButton("Enter");

    public registrationPage(){
        setTitle("registrationPage");
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
        jp.add(label3);
        jp.add(jt3);
        jp.add(Box.createRigidArea(new Dimension(5000, 0)));
        jp.add(label4);
        jp.add(jt4);
        jp.add(Box.createRigidArea(new Dimension(5000, 0)));
        jp.add(label5);
        jt5.setEchoChar('*');
        jp.add(jt5);
        jp.add(Box.createRigidArea(new Dimension(5000, 0)));
        jp.add(label6);
        jt6.setEchoChar('*');
        jp.add(jt6);

        jp.add(jb);

        jb.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                String input1 = jt1.getText();
                first.setText(input1);
                String input2 = jt2.getText();
                last.setText(input2);
                String input3 = jt3.getText();
                email.setText(input3);
                String input4 = jt4.getText();
                email.setText(input4);
                if (new String(jt5.getPassword()).equals(new String(jt6.getPassword()))){
                    String input5 = new String(jt5.getPassword());
                    pass.setText(input5);
                    System.out.println("Yay coolios");
                    menuPage page = new menuPage();
                }
                else {
                    System.out.println("You suck at typing the same thing twice");
                }
            }
        });

        add(jp);
    }

    public static void main(String[]args){
        registrationPage page = new registrationPage();
    }
}