package app;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class LoginCertificationServlet
 */
@WebServlet("/LoginCertificationServlet")
public class LoginCertificationServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginCertificationServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=UTF-8");
		HttpSession session = request.getSession(true);
		String status = (String) session.getAttribute("login");

		PrintWriter pw = response.getWriter();
		Map <String, String> responseData = new HashMap<>();
		if(status == null) {
			responseData.put("result", "false");
			pw.append(new ObjectMapper().writeValueAsString(responseData));
		}else {
			responseData.put("result", "true");
			responseData.put("EmpName", (String) session.getAttribute("EmpName"));
			responseData.put("EmpRole", (String) session.getAttribute("EmpRole"));
			responseData.put("EmpId", (String) session.getAttribute("EmpId"));
			pw.append(new ObjectMapper().writeValueAsString(responseData));
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	}

}
