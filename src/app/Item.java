package app;

import java.io.Serializable;

public class Item implements Serializable{
	/** 商品コード */
	private String itemCd;
	/** 商品名 */
	private String itemName;
	/** 商品名カナ */
	private String itemNameKana;
	/** 商品説明 */
	private String description;
	/** 画像URL */
	private String url;
	/** 販売単価 */
	private int salesPrice;
	/** 税区分 */
	private String taxType;
	/** 税区分 */
	private String taxTypeName;
	/** 商品分類コード */
	private String itemGroupCode;
	/** 商品分類名 */
	private String itemGroupName;
	/** 在庫数 */
	private int stock;

	public String getItemCd() {
		return itemCd;
	}
	public void setItemCd(String itemCd) {
		this.itemCd = itemCd;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public String getItemNameKana() {
		return itemNameKana;
	}
	public void setItemNameKana(String itemNameKana) {
		this.itemNameKana = itemNameKana;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public int getSalesPrice() {
		return salesPrice;
	}
	public void setSalesPrice(int salesPrice) {
		this.salesPrice = salesPrice;
	}
	public String getTaxType() {
		return taxType;
	}
	public void setTaxType(String taxType) {
		this.taxType = taxType;
	}
	public String getItemGroupCode() {
		return itemGroupCode;
	}
	public void setItemGroupCode(String itemGroupCode) {
		this.itemGroupCode = itemGroupCode;
	}
	public int getStock() {
		return stock;
	}
	public void setStock(int stock) {
		this.stock = stock;
	}
	@Override
	public String toString() {
		return "Item [itemCd=" + itemCd + ", itemName=" + itemName + ", itemNameKana=" + itemNameKana + ", description="
				+ description + ", url=" + url + ", salesPrice=" + salesPrice + ", taxType=" + taxType
				+ ", itemGroupCode=" + itemGroupCode + ", stock=" + stock + "]";
	}
	public String getTaxTypeName() {
		return taxTypeName;
	}
	public void setTaxTypeName(String taxTypeName) {
		this.taxTypeName = taxTypeName;
	}
	public String getItemGroupName() {
		return itemGroupName;
	}
	public void setItemGroupName(String itemGroupName) {
		this.itemGroupName = itemGroupName;
	}
}
