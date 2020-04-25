import javax.swing.JFrame;
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class homePage extends JComponent{
    static int FrameWidth = 1000;
    static int FrameHeight = 800;
    int loginSide1 = 200;
    int loginSide2 = 60;
    int x = FrameWidth / 2 - loginSide1 / 2;
    int y = FrameHeight * 3 / 4;
    
    public void paintComponent(Graphics g){
        super.paintComponent(g);
        Graphics2D g2 = (Graphics2D) g;
        
        g2.setPaint(Color.LIGHT_GRAY);
        Rectangle background = new Rectangle(0, 0, FrameWidth, FrameHeight);
        g2.draw(background);
        g2.fill(background);

        g2.setPaint(new GradientPaint(x, y, Color.RED, x + loginSide1, y + loginSide2, 
        Color.ORANGE));
        Rectangle rect = new Rectangle(x, y, loginSide1, loginSide2);
        g2.draw(rect);
        g2.fill(rect);
        
        g2.setPaint(Color.black);
        Font myFont1 = new Font("Roboto", Font.PLAIN, 40);
        g2.setFont(myFont1);
        g2.drawString("Login", x + loginSide1 / 4, y + loginSide2 * 3 / 4);
        
        Font myFont2 = new Font("Roboto", Font.PLAIN, 60);
        g2.setFont(myFont2);
        g2.drawString("Welcome To", FrameWidth / 4 + 50, FrameHeight / 4);

        Font myFont3 = new Font("Roboto", Font.PLAIN, 60);
        g2.setFont(myFont3);
        g2.drawString("Corona Personal Trainer", FrameWidth / 4 - 100, FrameHeight / 2);
    }

    public void response(int g, int h){
        if(g > x && g < x + loginSide1 && h > y && h < y + loginSide2){
            System.out.println("hi");
        }
    }

    public static void main(String[] args) throws InterruptedException {
        JFrame frame = new JFrame();
        frame.setSize(FrameWidth, FrameHeight);
        frame.setTitle("homePage");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        homePage page = new homePage();

        class MouseClick implements MouseListener
        {
            public void mousePressed(MouseEvent event){};
            public void mouseReleased(MouseEvent event){};
            public void mouseEntered(MouseEvent event){};
            public void mouseClicked(MouseEvent event)
            {

                int x = event.getX();
                int y = event.getY();
               
                page.response(x,y);
                
            }
            public void mouseExited(MouseEvent event){};
        }
        
        MouseListener mouse = new MouseClick();
        page.addMouseListener(mouse);

        frame.add(page);
        frame.setVisible(true);
    }

}

    
    