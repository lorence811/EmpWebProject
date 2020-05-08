package app;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class ExpanseChangeServlet
 */
@WebServlet("/ExpanseChangeServlet")
public class ExpenseChangeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public ExpenseChangeServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String Id= request.getParameter("Id");
		connectToDB();
		String sql = creatSql(Id);
		Expanse expanse = new Expanse();
		getExpenseInfoFromDB(sql, expanse);
		PrintWriter pw = response.getWriter();
		pw.append(new ObjectMapper().writeValueAsString(expanse));
	}

	private String creatSql(String Id) {
		String sql = "select  \n" +
				"* \n" +
				"from \n" +
				"EXPENSE \n" +
				" \n" +
				"where 1=1 \n" +
				"and ID = '"+Id+"' \n";
		return sql;
	}
	private void getExpenseInfoFromDB(String sql, Expanse expanse) {
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
			putExpanseInfoIntoList(expanse, rs1);
		} catch (Exception e) {
			throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
		}
	}
	private void putExpanseInfoIntoList(Expanse expanse, ResultSet rs1) throws SQLException {
		if (rs1.next()) {
			expanse.setClaimedDate(rs1.getString("CLAIMEDDATE"));
			expanse.setTitle(rs1.getString("TITLE"));
			expanse.setStatus(rs1.getString("STATUS"));
			expanse.setId(rs1.getInt("ID"));
			expanse.setAmount(rs1.getInt("AMOUNT"));
			expanse.setClaimerName(rs1.getString("CLAIMRNAME"));
			expanse.setDestination(rs1.getString("DESTINATION"));
			expanse.setReason(rs1.getString("REASON"));
			expanse.setUpdateDate(rs1.getString("UPDATEDATE"));
			expanse.setUpdateName(rs1.getString("UPDATENAME"));
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
		HttpSession session = request.getSession(true);
		String claimerName = (String) session.getAttribute("EmpName");

		String ID = request.getParameter("ID");

		String claimedDate = request.getParameter("claimedDate");

		String title = request.getParameter("title");

		String destination = request.getParameter("destination");

		String amount = request.getParameter("amount");

		String sql = "insert into EXPENSE (ID,CLAIMRNAME,CLAIMEDDATE,TITLE,DESTINATION,AMOUNT,STATUS)values('"+ID+"','"+claimerName+"','"+claimedDate+"','"+title+"','"+destination+"','"+amount+"','申請中') \n";

		connectToDB();

		doInsertSql(sql);

		// アクセスした人に応答するためのJSONを用意する
		PrintWriter pw = response.getWriter();
		// JSONで出力する
		pw.append(new ObjectMapper().writeValueAsString("ok"));
	}
	private void doInsertSql(String sql) {
		// データベースにアクセスするために、データベースのURLとユーザ名とパスワードを指定
		String url = "jdbc:oracle:thin:@localhost:1521:XE";
		String user = "webapp";
		String pass = "webapp";
		// エラーが発生するかもしれない処理はtry-catchで囲みます
		// この場合はDBサーバへの接続に失敗する可能性があります
		try (
				// データベースへ接続します
				Connection con = DriverManager.getConnection(url, user, pass);
				// SQLの命令文を実行するための準備をおこないます
				Statement stmt = con.createStatement();
			) {
			// SQLの命令文を実行し、その件数をint型のresultCountに代入します
			stmt.executeUpdate(sql);

		} catch (Exception e) {
			throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
		}
	}

}
