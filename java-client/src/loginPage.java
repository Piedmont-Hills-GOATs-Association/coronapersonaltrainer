import java.awt.FlowLayout;
import javax.swing.JFrame;
import javax.swing.JTextField;
import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.*;
import java.awt.BorderLayout;
 
public class loginPage extends JFrame{
    JPanel jp = new JPanel();
    JLabel jl = new JLabel();
    //JLabel myLabel = new JLabel("This is my message");

    JTextField jt1 = new JTextField("default", 30);
    JTextField jt2 = new JTextField("hi", 30);
    JButton jb = new JButton("Enter");

    public loginPage(){
        setTitle("loginPage");
        setVisible(true);
        setSize(1000,1000);
        setDefaultCloseOperation(EXIT_ON_CLOSE);

        jp.add(jt1);
        jt1.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                String input = jt1.getText();
                jl.setText(input);
            }
        });

        jp.add(jt2);
        jt2.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                String input = jt2.getText();
                jl.setText(input);
            }
        });

        jp.add(jb);
        jb.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                String input1 = jt1.getText();
                jl.setText(input1);
                String input2 = jt2.getText();
                jl.setText(input2);
            }
        });

        //jp.add(myLabel,BorderLayout.WEST);
        //jp.add(jt1,BorderLayout.CENTER);
        jp.add(jl);
        add(jp);
    }

    public static void main(String[]args){
        loginPage page = new loginPage();
    }
}