import javax.swing.JFrame;
import javax.swing.JTextField;
import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.*;
import java.awt.*;

public class loginPage extends JFrame{
    static int FrameWidth = 1000;
    static int FrameHeight = 800;
    JPanel jp = new JPanel();
    JLabel user = new JLabel();
    JLabel pass = new JLabel();

    JLabel label1 = new JLabel("Username");
    JLabel label2 = new JLabel("Password");

    JTextField jt1 = new JTextField("", 30);
    JPasswordField jt2 = new JPasswordField("", 30);
    JButton jb = new JButton("Enter");
    JButton register = new JButton("Don't have an account?");

    public loginPage(){
        setTitle("loginPage");
        setVisible(true);
        setSize(FrameWidth,FrameHeight);
        setDefaultCloseOperation(EXIT_ON_CLOSE);

        jp.add(Box.createRigidArea(new Dimension(0, 300)));
        jp.add(label1);
        jp.add(jt1);
        jp.add(Box.createRigidArea(new Dimension(5000, 0)));
        jp.add(label2);
        jt2.setEchoChar('*');
        jp.add(jt2);
        jp.add(Box.createRigidArea(new Dimension(5000, 0)));
        jp.add(jb);
        jp.add(register);

        jb.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                String input1 = jt1.getText();
                user.setText(input1);
                String input2 = new String(jt2.getPassword());
                pass.setText(input2);
                menuPage page = new menuPage();
            }
        });

        register.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                registrationPage page = new registrationPage();
            }
        });

        add(jp);
    }
    public static void main(String []args){
        loginPage page = new loginPage();
    }
}
