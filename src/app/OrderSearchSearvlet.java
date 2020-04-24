package app;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import step5_11.Order;

/**
 * Servlet implementation class OrderSearchSearvlet
 */
@WebServlet("/OrderSearchSearvlet")
public class OrderSearchSearvlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public OrderSearchSearvlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
		String orderCd = request.getParameter("orderCd");
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

		List<Order> orders =new ArrayList<>();

		// DBに接続してSQLを実行
				try (
						// データベースへ接続します
						Connection con = DriverManager.getConnection(url, user, pass);

						// SQLの命令文を実行するための準備をおこないます
						PreparedStatement stmt = createPreparedStatement(con,orderCd);

						// SQLの命令文を実行し、その結果をResultSet型のrsに代入します
						ResultSet rs1 = stmt.executeQuery();
					) {

					// SQL実行後の処理内容


					// 取得結果分だけループを回してitemListに追加していく。
					while (rs1.next()) {
						Order order = new Order();
						order.setOrderCd(rs1.getString("ORDER_CD"));
						order.setOrderDate(rs1.getString("ORDER_DATE"));
						order.setOrderDetailCd(rs1.getString("ORDER_DETAIL_CD"));
						order.setPrice(rs1.getBigDecimal("SALES_PRICE"));
						order.setPurchaseUserCd(rs1.getString("PURCHASE_USER_CD"));
						order.setQuantity(rs1.getInt("QUANTITY"));
						orders.add(order);

					}
				} catch (Exception e) {
					throw new RuntimeException(String.format("検索処理の実施中にエラーが発生しました。詳細：[%s]", e.getMessage()), e);
				}

				PrintWriter pw = response.getWriter();
				// JSONで出力する
				pw.append(new ObjectMapper().writeValueAsString(orders));

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}
	private static PreparedStatement createPreparedStatement(Connection con, String orderCd) throws SQLException {

		// 実行するSQL文
		String sql = "select \n" +
				"T.ORDER_CD \n" +
				",T.ORDER_DATE \n" +
				",T.PURCHASE_USER_CD \n" +
				",TD.ORDER_DETAIL_CD \n" +
				",TD.SALES_PRICE \n" +
				",TD.ITEM_CD \n" +
				",TD.QUANTITY \n" +
				" \n" +
				"from \n" +
				"TR_ORDERS T \n" +
				",TR_ORDER_DETAIL TD \n" +
				" \n" +
				"where 1=1 \n" +
				"and T.ORDER_CD =? \n" +
				"and TD.ORDER_CD = T.ORDER_CD \n";

	    PreparedStatement stmt = con.prepareStatement(sql);
	    stmt.setString(1, orderCd);

	    return stmt;
	}

}
