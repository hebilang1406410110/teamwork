
<servlet>
    <servlet-name>handleComputer</servlet-name>
    <servlet-class>rain.snow.HandleComputer</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>handleComputer </servlet-name>
    <url-pattern>/helpComputer</url-pattern>
</servlet-mapping>

ComputerBean.java
package flower.grass;
public class ComputerBean {
   double numberOne,numberTwo,result;
   String operator="+";
   public void setNumberOne(double n) {
      numberOne=n;
   }
   public double getNumberOne(){
      return numberOne; 
   }
   public void setNumberTwo(double n) {
      numberTwo=n;
   }
   public double getNumberTwo(){
      return numberTwo; 
   }
   public void setOperator(String s) {
      operator=s.trim();
   }
   public String getOperator(){
      return operator;
   }
   public void setResult(double r) {
      result=r; 
   }
   public double getResult(){
      return result; 
   }
}

inputNumber.jsp
<%@ page contentType="text/html;charset=GB2312" %>
<%@ page import="flower.grass.ComputerBean" %> 
<HTML><BODY ><FONT size=2>
  <FORM action="helpComputer" method=post name=form>
  <TABLE>
   <TR><TD> ����������:</TD>
        <TD> <Input type=text name="numberOne" value=0 size=6></TD>
        <TD> <Input type=text name="numberTwo" value=0 size=6></TD>
   </TR>
   <TR>
      <TD>ѡ���������:</TD>
      <TD> <Select name="operator">
              <Option value="+">+(��)
              <Option value="-">-������
              <Option value="*">*���ˣ�
              <Option value="/">/������
            </Select> 
       </TD>
       <TD> <Input type="submit" value="�ύѡ��" name="submit"></TD>
   </TR>
   </TABLE>
   </FORM> 
</BODY></HTML>


showResult.jsp��Ч����ͼ9.5��ʾ��
<%@ page contentType="text/html;charset=GB2312" %>
<%@ page import="flower.grass.ComputerBean" %> 
<HTML><BODY ><FONT size=3>
  <jsp:useBean id="ok" type="flower.grass.ComputerBean" scope="session"/>
    ��������
  <jsp:getProperty name="ok" property="numberOne"/>
  <jsp:getProperty name="ok" property="operator"/>
  <jsp:getProperty name="ok" property="numberTwo"/> =
  <jsp:getProperty name="ok" property="result"/> 
   <FORM action="helpComputer" method=post name=form>
   <TABLE>
   <TR><TD> ����������:</TD>
        <TD> <Input type=text name="numberOne" value="<jsp:getProperty 
name="ok" property="result"/>"size=10></TD>
        <TD> <Input type=text name="numberTwo" value=0 size=10></TD>
   </TR>
   <TR>
       <TD>ѡ���������:</td>
       <TD> <Select name="operator">
               <Option value="+">+(��)
               <Option value="-">-������
               <Option value="*">*���ˣ�
               <Option value="/">/������
             </Select> 
        </TD>
        <TD> <Input type="submit" value="�ύѡ��" name="submit"></TD>
   </TR>
   </TABLE>
</BODY></HTML>


HandleComputer.java
package rain.snow;
import flower.grass.*;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
public class HandleComputer extends HttpServlet{
   public void init(ServletConfig config) throws ServletException{
      super.init(config);
   }
   public void doPost(HttpServletRequest request,HttpServletResponse response) 
                        throws ServletException,IOException {   
      ComputerBean dataBean=null;
      HttpSession session=request.getSession(true);
      try{  dataBean=(ComputerBean)session.getAttribute("ok");
           if(dataBean==null) {
              dataBean=new ComputerBean();  	//����Javabean����
              session.setAttribute("ok",dataBean);	//��dataBean�洢��session������ 
           }
      }
      catch(Exception exp) {
          dataBean=new ComputerBean();  		//����Javabean����
          session.setAttribute("ok",dataBean);	//��dataBean�洢��session������  
      } 
      double numberOne=Double.parseDouble(request.getParameter("numberOne"));
      double numberTwo=Double.parseDouble(request.getParameter("numberTwo"));
      String operator=request.getParameter("operator");
      double result=0;
      if(operator.equals("+")){
         result=numberOne+numberTwo;
      } 
      else if(operator.equals("-")){
         result=numberOne-numberTwo;
      }
      else if(operator.equals("*")){
         result=numberOne*numberTwo;
      }
      else if(operator.equals("/")){
         result=numberOne/numberTwo;
      }
      dataBean.setNumberOne(numberOne);     	//�����ݴ洢��dataBean�� 
      dataBean.setNumberTwo(numberTwo);     	//�����ݴ洢��dataBean�� 
      dataBean.setOperator(operator);      		//�����ݴ洢��dataBean��
      dataBean.setResult(result);          		//�����ݴ洢��dataBean�� 
      RequestDispatcher dispatcher= request.getRequestDispatcher("/showResult.jsp");
      dispatcher.forward(request, response);	 //����showResult.jsp��ʾdataBean�е�����
    } 
   public void doGet(HttpServletRequest request,HttpServletResponse response) 
                        throws ServletException,IOException {  
      doPost(request,response);
   }
}

