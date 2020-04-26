import javax.swing.JFrame;
import javax.swing.*;
//import java.awt.geom.*;
import java.awt.*;
import java.awt.event.*;

public class homePage extends JComponent{
    int loginSide1 = 200;
    int loginSide2 = 60;
    int x = 620;
    int y = 500;
    public void paintComponent(Graphics g){
        super.paintComponent(g);
        Graphics2D g2 = (Graphics2D) g;
        
        Rectangle rect = new Rectangle(x, y, loginSide1, loginSide2);
        g2.draw(rect);
        
        Font myFont1 = new Font ("Courier New", 1, 40);
        g2.setFont(myFont1);
        g2.drawString("Login", 660, 540);
        
        Font myFont2 = new Font ("Courier New", 1, 60);
        g2.setFont(myFont2);
        g2.drawString("Welcome To", 535, 300);

        Font myFont3 = new Font ("Courier New", 1, 60);
        g2.setFont(myFont3);
        g2.drawString("Corona Personal Trainer", 300, 400);
    }

    public void response(int g, int h){
        if(g > x && g < x + loginSide1 && h > y && h < y + loginSide2){
            System.out.println("hi");
        }
    }

    public static void main(String[] args) throws InterruptedException {
        JFrame frame = new JFrame();
        frame.setSize(1500, 1000);
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

    
    