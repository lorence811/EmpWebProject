package app;

public class Expanse {
	private int Id;
	private String claimerName;
	private String claimedDate;
	private String title;
	private String destination;
	private int amount;
	private String status;
	private String reason;
	private String updateName;
	private String updateDate;
	public int getId() {
		return Id;
	}
	public void setId(int id) {
		Id = id;
	}
	public String getClaimerName() {
		return claimerName;
	}
	public void setClaimerName(String claimerName) {
		this.claimerName = claimerName;
	}
	public String getClaimedDate() {
		return claimedDate;
	}
	public void setClaimedDate(String claimedDate) {
		this.claimedDate = claimedDate;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDestination() {
		return destination;
	}
	public void setDestination(String destination) {
		this.destination = destination;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public String getUpdateName() {
		return updateName;
	}
	public void setUpdateName(String updateName) {
		this.updateName = updateName;
	}
	public String getUpdateDate() {
		return updateDate;
	}
	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}
}
