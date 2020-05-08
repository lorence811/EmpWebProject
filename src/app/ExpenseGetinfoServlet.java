package app;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class ExpanseGetinfoServlet
 */
@WebServlet("/ExpanseGetinfoServlet")
public class ExpenseGetinfoServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public ExpenseGetinfoServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession(true);
		String EmpName = (String) session.getAttribute("EmpName");
		connectToDB();

		String sql = creatSql(EmpName);
		List<Expanse> ExpanseList = new ArrayList<>();
		getApInfoFromDB(sql, ExpanseList);
		PrintWriter pw = response.getWriter();
		pw.append(new ObjectMapper().writeValueAsString(ExpanseList));

	}

	private String creatSql(String EmpName) {
		String sql = "select \n" +
				"* \n" +
				" \n" +
				"from \n" +
				"EXPENSE \n" +
				" \n" +
				"where 1=1 \n" +
				"and CLAIMRNAME = '"+EmpName+"' \n";
		return sql;
	}
	private void getApInfoFromDB(String sql, List<Expanse> ExpanseList) {
		String url = "jdbc:oracle:thin:@localhost:1521:XE";
		String user = "webapp";
		String pass = "webapp";
		try (
				// データベースへ接続します
				Connection con = DriverManager.getConnection(url, user, pass);

				// SQLの命令文を実行するための準備をおこないます
				Statement stmt = con.createStatement();

				// SQLの命令文を実行し、その結果をResultSet型のrsに代入します
				ResultSet rs1 = stmt.executeQuery(sql);) {
			// SQL実行後の処理内容

			// SQL実行結果を商品リストに追加していく。
			putExpanseInfoIntoList(ExpanseList, rs1);
		} catch (Exception e) {
			throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
		}
	}
	private void putExpanseInfoIntoList(List<Expanse> ExpanseList, ResultSet rs1) throws SQLException {
		while (rs1.next()) {
			Expanse expanse = new Expanse();
			expanse.setClaimedDate(rs1.getString("CLAIMEDDATE"));
			expanse.setTitle(rs1.getString("TITLE"));
			expanse.setStatus(rs1.getString("STATUS"));
			expanse.setId(rs1.getInt("ID"));
			ExpanseList.add(expanse);
		}
	}
	private void connectToDB() {
		// JDBCドライバの準備
		try {

		    // JDBCドライバのロード
		    Class.forName("oracle.jdbc.driver.OracleDriver");

		} catch (ClassNotFoundException e) {
		    // ドライバが設定されていない場合はエラーになります
		    throw new RuntimeException(String.format("JDBCドライバのロードに失敗しました。詳細:[%s]", e.getMessage()), e);
		}
	}
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	}

}
