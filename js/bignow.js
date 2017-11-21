
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
   <TR><TD> 输入两个数:</TD>
        <TD> <Input type=text name="numberOne" value=0 size=6></TD>
        <TD> <Input type=text name="numberTwo" value=0 size=6></TD>
   </TR>
   <TR>
      <TD>选择运算符号:</TD>
      <TD> <Select name="operator">
              <Option value="+">+(加)
              <Option value="-">-（减）
              <Option value="*">*（乘）
              <Option value="/">/（除）
            </Select> 
       </TD>
       <TD> <Input type="submit" value="提交选择" name="submit"></TD>
   </TR>
   </TABLE>
   </FORM> 
</BODY></HTML>


showResult.jsp（效果如图9.5所示）
<%@ page contentType="text/html;charset=GB2312" %>
<%@ page import="flower.grass.ComputerBean" %> 
<HTML><BODY ><FONT size=3>
  <jsp:useBean id="ok" type="flower.grass.ComputerBean" scope="session"/>
    运算结果：
  <jsp:getProperty name="ok" property="numberOne"/>
  <jsp:getProperty name="ok" property="operator"/>
  <jsp:getProperty name="ok" property="numberTwo"/> =
  <jsp:getProperty name="ok" property="result"/> 
   <FORM action="helpComputer" method=post name=form>
   <TABLE>
   <TR><TD> 输入两个数:</TD>
        <TD> <Input type=text name="numberOne" value="<jsp:getProperty 
name="ok" property="result"/>"size=10></TD>
        <TD> <Input type=text name="numberTwo" value=0 size=10></TD>
   </TR>
   <TR>
       <TD>选择运算符号:</td>
       <TD> <Select name="operator">
               <Option value="+">+(加)
               <Option value="-">-（减）
               <Option value="*">*（乘）
               <Option value="/">/（除）
             </Select> 
        </TD>
        <TD> <Input type="submit" value="提交选择" name="submit"></TD>
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
              dataBean=new ComputerBean();  	//创建Javabean对象
              session.setAttribute("ok",dataBean);	//将dataBean存储到session对象中 
           }
      }
      catch(Exception exp) {
          dataBean=new ComputerBean();  		//创建Javabean对象
          session.setAttribute("ok",dataBean);	//将dataBean存储到session对象中  
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
      dataBean.setNumberOne(numberOne);     	//将数据存储在dataBean中 
      dataBean.setNumberTwo(numberTwo);     	//将数据存储在dataBean中 
      dataBean.setOperator(operator);      		//将数据存储在dataBean中
      dataBean.setResult(result);          		//将数据存储在dataBean中 
      RequestDispatcher dispatcher= request.getRequestDispatcher("/showResult.jsp");
      dispatcher.forward(request, response);	 //请求showResult.jsp显示dataBean中的数据
    } 
   public void doGet(HttpServletRequest request,HttpServletResponse response) 
                        throws ServletException,IOException {  
      doPost(request,response);
   }
}

