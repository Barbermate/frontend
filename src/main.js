const authCookie = getCookie("authToken");
const userData = JSON.parse(localStorage.getItem("userData"));

if (authCookie && !userData) {
    const fetchProfile = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/v1/auth/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authCookie}`
                }
            });

            if (response.ok) {
                const data = await response.json(); // Parse the response as JSON
                userData = data;
                console.log("Profile data stored in userData");
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    fetchProfile();
}