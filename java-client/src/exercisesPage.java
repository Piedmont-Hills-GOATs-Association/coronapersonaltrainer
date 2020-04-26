
import javax.swing.JFrame;
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class exercisesPage extends JComponent{
    static int FrameWidth = 1000;
    static int FrameHeight = 800;
    int loginSide1 = 200;
    int loginSide2 = 60;
    int x = FrameWidth / 2 - loginSide1 / 2;
    int y = FrameHeight * 3 / 4;

    String height;
    String weight;
    int h;
    int w;

    public void paintComponent(Graphics g){
        super.paintComponent(g);
        Graphics2D g2 = (Graphics2D) g;
        g2.drawString(height, 200, 200);

    public static void main(String[] args) throws InterruptedException {
        JFrame frame = new JFrame();
        frame.setSize(FrameWidth, FrameHeight);
        frame.setTitle("homePage");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        exercisesPage page = new exercisesPage();
        height = returnHeight();

        frame.add(page);
        frame.setVisible(true);
    }

}
