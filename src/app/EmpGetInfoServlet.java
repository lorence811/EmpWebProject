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

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class EmpGetInfoServlet
 */
@WebServlet("/EmpGetInfoServlet")
public class EmpGetInfoServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public EmpGetInfoServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String EmpId= request.getParameter("EmpId");

		String EmpName = request.getParameter("EmpName");

		String EmpApId = request.getParameter("EmpApId");

		String sql = creatSelectSql(EmpId, EmpName, EmpApId);

		List<Emp> EmpList = new ArrayList<>();

		getEmpInfoFromDB(sql, EmpList);
		// アクセスした人に応答するためのJSONを用意する
		PrintWriter pw = response.getWriter();
		// JSONで出力する
		pw.append(new ObjectMapper().writeValueAsString(EmpList));
	}

	private void getEmpInfoFromDB(String sql, List<Emp> EmpList) {
		connectToDB();
		// データベースにアクセスするために、データベースのURLとユーザ名とパスワードを指定
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
			putEmpToList(EmpList, rs1);
		} catch (Exception e) {
			throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
		}
	}

	private void putEmpToList(List<Emp> EmpList, ResultSet rs1) throws SQLException {
		while (rs1.next()) {
			Emp emp = new Emp();
			emp.setEmpName(rs1.getString("EMPNAME"));
			emp.setEmpId(rs1.getString("EMPID"));
			EmpList.add(emp);
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

	private String creatSelectSql(String EmpId, String EmpName, String EmpApId) {
		String sql="";

		if(EmpId.equals("")&&EmpName.equals("")&&EmpApId.equals("")){
			sql = creatSelectSqlByAll();
		}else if(EmpName.equals("")&&EmpApId.equals("")){
			sql = creatSelectSqlByEmpId(EmpId);
		}else if(EmpId.equals("")&&EmpName.equals("")){
			sql = creatSelectSqlByEmApId(EmpApId);
		}else if(EmpId.equals("")&&EmpApId.equals("")){
			sql = creatSelectSqlByEmpName(EmpName);
		}else if(EmpId.equals("")){
			sql = creatSelectSqlByEmpNameAndApId(EmpName, EmpApId);
		}else if(EmpName.equals("")){
			sql = creatSelectSqlByEmpIdAndEmpApId(EmpId, EmpApId);
		}else if(EmpApId.equals("")){
			sql = creatSelectSqlByEmpIdAndEmpName(EmpId, EmpName);
		}
		return sql;
	}

	private String creatSelectSqlByEmpIdAndEmpName(String EmpId, String EmpName) {
		String sql;
		sql="select \n" +
				"* \n" +
				"from \n" +
				"EMPINFO \n" +
				" \n" +
				"where 1=1 \n" +
				"and EMPID = '"+EmpId+"' \n" +
				"and EMPNAME like '%"+EmpName+"%' \n" +
				" \n" +
				"order by \n" +
				"EMPID \n" ;
		return sql;
	}

	private String creatSelectSqlByEmpIdAndEmpApId(String EmpId, String EmpApId) {
		String sql;
		sql="select \n" +
				"* \n" +
				"from \n" +
				"EMPINFO \n" +
				" \n" +
				"where 1=1 \n" +
				"and EMPID = '"+EmpId+"' \n" +
				"and EMPApId = '"+EmpApId+"' \n" +
				" \n" +
				"order by \n" +
				"EMPID \n" ;
		return sql;
	}

	private String creatSelectSqlByEmpNameAndApId(String EmpName, String EmpApId) {
		String sql;
		sql="select \n" +
				"* \n" +
				"from \n" +
				"EMPINFO \n" +
				" \n" +
				"where 1=1 \n" +
				"and EMPNAME like '%"+EmpName+"%' \n" +
				"and EMPApId = '"+EmpApId+"' \n" +
				" \n" +
				"order by \n" +
				"EMPID \n";
		return sql;
	}

	private String creatSelectSqlByEmpName(String EmpName) {
		String sql;
		sql="select \n" +
				"* \n" +
				"from \n" +
				"EMPINFO \n" +
				" \n" +
				"where 1=1 \n" +
				"and EMPNAME like '%"+EmpName+"%' \n" +
				" \n" +
				"order by \n" +
				"EMPID \n";
		return sql;
	}

	private String creatSelectSqlByEmApId(String EmpApId) {
		String sql;
		sql="select \n" +
				"* \n" +
				"from \n" +
				"EMPINFO \n" +
				" \n" +
				"where 1=1 \n" +
				"and EMPAPID = '"+EmpApId+"' \n" +
				"order by  \n" +
				"EMPINFO.EMPID \n";
		return sql;
	}

	private String creatSelectSqlByEmpId(String EmpId) {
		String sql;
		sql ="select \n" +
				"* \n" +
				"from \n" +
				"EMPINFO \n" +
				" \n" +
				"where 1=1 \n" +
				"and EMPID = '"+EmpId+"' \n" +
				"order by  \n" +
				"EMPINFO.EMPID \n";
		return sql;
	}

	private String creatSelectSqlByAll() {
		String sql;
		sql ="select \n" +
				"* \n" +
				"from \n" +
				"EMPINFO \n" +
				" \n" +
				"order by  \n" +
				"EMPINFO.EMPID \n";
		return sql;
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String EmpId= request.getParameter("EmpId");
		connectToDB();
		String sql = creatDeleteSql(EmpId);
		// データベースにアクセスするために、データベースのURLとユーザ名とパスワードを指定
		String url = "jdbc:oracle:thin:@localhost:1521:XE";
		String user = "webapp";
		String pass = "webapp";

		deleteEmp(sql, url, user, pass);

		// アクセスした人に応答するためのJSONを用意する
		PrintWriter pw = response.getWriter();
		// JSONで出力する
		pw.append(new ObjectMapper().writeValueAsString("ok"));
	}

	private void deleteEmp(String sql, String url, String user, String pass) {
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
	}

	private String creatDeleteSql(String EmpId) {
		// 実行するSQL文
		String sql = "DELETE FROM EMPINFO \n" +
				"WHERE EMPID = '"+EmpId+"' \n" ;
		return sql;
	}

}
