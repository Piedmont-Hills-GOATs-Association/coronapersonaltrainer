import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.io.IOException;
import java.io.File;

public class homePage extends JComponent{
    static int FrameWidth = 1000;
    static int FrameHeight = 800;
    int loginSide1 = 200;
    int loginSide2 = 60;
    int x = FrameWidth / 2 - loginSide1 / 2;
    int y = FrameHeight * 3 / 4;
    Font CenturyGothic;

    public void paintComponent(Graphics g){
        super.paintComponent(g);
        Graphics2D g2 = (Graphics2D) g;

        try {
            GraphicsEnvironment ge =
            GraphicsEnvironment.getLocalGraphicsEnvironment();
            CenturyGothic = Font.createFont(Font.TRUETYPE_FONT, new File("Century_Gothic_400.ttf"));
            ge.registerFont(CenturyGothic);
        } catch (IOException|FontFormatException e) {
            //Handle exception
        }

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
        g2.setFont(CenturyGothic);
        g2.drawString("Login", x + loginSide1 / 4, y + loginSide2 * 3 / 4);

        Font myFont2 = new Font("Dialog", Font.PLAIN, 60);
        g2.setFont(myFont2);
        g2.drawString("Welcome To Your", FrameWidth / 4, FrameHeight / 4);
        g2.drawString("COVID-19 Personal Trainer", FrameWidth / 4 - 100, FrameHeight / 2);
    }

    public void response(int g, int h){
        if(g > x && g < x + loginSide1 && h > y && h < y + loginSide2){
            loginPage page = new loginPage();
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
