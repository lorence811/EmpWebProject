package app;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
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
 * Servlet implementation class EmpLoginServlet
 */
@WebServlet("/EmpLoginServlet")
public class EmpLoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public EmpLoginServlet() {
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
		String loginRequest = request.getParameter("loginRequest");
		PrintWriter pw = response.getWriter();
		if(status == null) {
			if(loginRequest != null &&  loginRequest.equals("login")) {

				pw.append(new ObjectMapper().writeValueAsString("success"));
			}else {
				pw.append(new ObjectMapper().writeValueAsString("ログインして下さい。"));
			}
		}else {
			if (loginRequest != null && loginRequest.equals("logout")){
				session.removeAttribute("login");
				session.removeAttribute("EmpName");
				session.removeAttribute("EmpRole");
				pw.append(new ObjectMapper().writeValueAsString("ログアウト完了。"));
			}else {
				pw.append(new ObjectMapper().writeValueAsString("already"));
			}
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	// 入力されたユーザーIDとパスワードを取得
			String EmpId = request.getParameter("EmpId");
			String password = request.getParameter("Password");
			HttpSession session = request.getSession(true);
			// アクセスした人に応答するためのJSONを用意する
			PrintWriter pw = response.getWriter();

			prepareConnectToDB();

			// データベースにアクセスするために、データベースのURLとユーザ名とパスワードを指定
			String url = "jdbc:oracle:thin:@localhost:1521:XE";
			String user = "webapp";
			String pass = "webapp";

//			String sql = "select \n" +
//					"EMPID \n" +
//					",PASSWORD \n" +
//					" \n" +
//					"from \n" +
//					"LOGININFO \n" +
//					" \n" +
//					"where 1=1 \n" +
//					"and EMPID='"+EmpId+"' \n" +
//					"and PASSWORD='"+password+"'";

			// DBへ接続してSQLを実行
			try (// データベースへ接続します
					Connection con = DriverManager.getConnection(url, user, pass);

					// SQLの命令文を実行するための準備をおこないます
					PreparedStatement stmt = createPreparedStatement(con, EmpId, password);

					// SQLの命令文を実行し、その結果をResultSet型のrsに代入します
					ResultSet rs1 = stmt.executeQuery();) {

				// SQLの取得結果がある時（ユーザIDとパスワードが一致しているユーザーがいる）は「ok」という文字列を画面に返却
				// そうでないときは「ng」を返却
				// 返却データを作成
				Map <String, String> responseData = new HashMap<>();
				if (rs1.next()) {
					session.setAttribute("login", "ok");
					// ログインの結果
					responseData.put("result", "ok");
					session.setAttribute("EmpName", rs1.getString("EMPNAME"));
					session.setAttribute("EmpRole", rs1.getString("EMPROLE"));
					session.setAttribute("EmpId", rs1.getString("EMPID"));
				}else{
					responseData.put("result", "ng");

				}
				pw.append(new ObjectMapper().writeValueAsString(responseData));

			} catch (Exception e) {
				throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
				}


			}

	private void prepareConnectToDB() {
		// JDBCドライバの準備
		try {

		    // JDBCドライバのロード
		    Class.forName("oracle.jdbc.driver.OracleDriver");

		} catch (ClassNotFoundException e) {
		    // ドライバが設定されていない場合はエラーになります
		    throw new RuntimeException(String.format("JDBCドライバのロードに失敗しました。詳細:[%s]", e.getMessage()), e);
		}
	}
	private PreparedStatement createPreparedStatement(Connection con, String userId, String password) throws SQLException {
		System.out.println("userId="+userId);
		System.out.println("password="+password);
		// 実行するSQL文
		String sql =  "select \n" +
				"l.PASSWORD \n" +
				",e.EMPID \n" +
				",e.EMPNAME \n" +
				",l.EMPROLE \n" +
				"from \n" +
				"LOGININFO l \n" +
				",EMPINFO e \n" +
				" \n" +
				"where 1=1 \n" +
				"and e.EMPID = l.EMPID \n" +
				"and l.PASSWORD =?" +
				"and l.EMPID =?";

	    PreparedStatement stmt = con.prepareStatement(sql);
	    stmt.setString(1, password);
	    stmt.setString(2, userId);


	    return stmt;
	}
}

