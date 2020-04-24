package app;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class EmpAddNewServlet
 */
@WebServlet("/EmpAddNewServlet")
public class EmpAddNewServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public EmpAddNewServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String EmpId= request.getParameter("EmpId");

		String EmpName = request.getParameter("EmpName");

		String EmpAge = request.getParameter("EmpAge");

		String EmpGender = request.getParameter("EmpGender");
		//
		String EmpAddress = request.getParameter("EmpAddress");

		String EmpApId = request.getParameter("EmpApId");

		// JDBCドライバの準備
			try {
				// JDBCドライバのロード
				Class.forName("oracle.jdbc.driver.OracleDriver");
			} catch (ClassNotFoundException e) {
				// ドライバが設定されていない場合はエラーになります
				throw new RuntimeException(String.format("JDBCドライバのロードに失敗しました。詳細:[%s]", e.getMessage()), e);
			}

			// データベースにアクセスするために、データベースのURLとユーザ名とパスワードを指定
			String url = "jdbc:oracle:thin:@localhost:1521:XE";
			String user = "webapp";
			String pass = "webapp";

			// 実行するSQL文
			String sql = "insert into EMPINFO(EMPID, EMPAGE, EMPGENDER, EMPADDRESS, EMPAPID, \n" +
					"	EMPNAME)values('"+EmpId+"','"+EmpAge+"','"+EmpGender+"','"+EmpAddress+"','"+EmpApId+"','"+EmpName+"') \n" ;

			// エラーが発生するかもしれない処理はtry-catchで囲みます
			// この場合はDBサーバへの接続に失敗する可能性があります
			try (
					// データベースへ接続します
					Connection con = DriverManager.getConnection(url, user, pass);
					// SQLの命令文を実行するための準備をおこないます
					Statement stmt = con.createStatement();
				) {
				// SQLの命令文を実行し、その件数をint型のresultCountに代入します
				int resultCount = stmt.executeUpdate(sql);

			} catch (Exception e) {
				throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
			}

			// アクセスした人に応答するためのJSONを用意する
			PrintWriter pw = response.getWriter();
			// JSONで出力する
			pw.append(new ObjectMapper().writeValueAsString("ok"));
	}

}
