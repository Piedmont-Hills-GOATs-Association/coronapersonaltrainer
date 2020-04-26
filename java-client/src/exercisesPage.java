import javax.swing.JFrame;
import javax.swing.JTextField;
import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.*;
import java.awt.*;

public class exercisesPage extends JFrame{
    static int FrameWidth = 1000;
    static int FrameHeight = 800;
    int loginSide1 = 200;
    int loginSide2 = 60;
    int x = FrameWidth / 2 - loginSide1 / 2;
    int y = FrameHeight * 3 / 4;

    JPanel jp = new JPanel();
    JLabel label1 = new JLabel("Your Height:");
    JLabel label2 = new JLabel("Your Weight:");

    public exercisesPage(String height, String weight){
        setTitle("loginPage");
        setVisible(true);
        setSize(FrameWidth,FrameHeight);
        setDefaultCloseOperation(EXIT_ON_CLOSE);

        JLabel h = new JLabel(height);
        JLabel w = new JLabel(weight);

        jp.add(label1);
        jp.add(h);
        jp.add(label2);
        jp.add(w);

        add(jp);
    }
}
