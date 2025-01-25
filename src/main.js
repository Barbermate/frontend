const authCookie = getCookie("authToken");
let userData = JSON.parse(localStorage.getItem("userData"));
const userDataSubject = new Subject();

if (authCookie && !userData) {
  const fetchProfile = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCookie}`,
        },
      });

      if (response.ok) {
        const data = await response.json(); // Parse the response as JSON

        addItemToLocalStorage("userData", JSON.stringify(data));

        userData = data;
        userDataSubject.next(data);
        
        console.log("Profile data stored in userData");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  fetchProfile();
}
