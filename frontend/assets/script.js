document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.navbar a');

  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          navLinks.forEach(nav => nav.classList.remove('active'));
          link.classList.add('active');
      });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let menu = document.querySelector("#menu-icon");
  let navbar = document.querySelector(".navbar");

  menu.onclick = () => {
    menu.classList.toggle("bx-x");
    navbar.classList.toggle("open");
  };
});

document.addEventListener("DOMContentLoaded", function () {
  const btn = document.querySelector("button");
  const post = document.querySelector(".post");
  const reviews = document.querySelector(".reviews");
  const rate = document.querySelector(".rateMe");

  const commentForm = document.getElementById("commentForm");
  const commentTextarea = document.querySelector(".textarea textarea");
  const nameArea = document.querySelector(".name textarea");

  const starLabels = document.querySelectorAll(".reviews label");

  let selectedStar = 0;

  starLabels.forEach((label) => {
    label.addEventListener("click", () => {
      selectedStar = parseInt(label.getAttribute("for").split("-")[1]);
    });
  });

  commentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const comment = commentTextarea.value;
    const name = nameArea.value;
    console.log("Star Rating:", selectedStar);
    console.log("Comment:", comment);
    console.log("Name:", name);

    const formData = {
      rating: selectedStar,
      comment: comment,
      name: name,
    };

    fetch("/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        alert("Review submitted successfully!");

        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      });

    reviews.style.display = "none";
    rate.style.display = "none";
    post.style.display = "block";
  });
});

window.onload = async () => {
  try {
    const response = await fetch("/data");
    const data = await response.json();

    if (response.ok) {
      const testimonialBoxContainer = document.querySelector(
        ".testimonial-box-container"
      );

      data.forEach((item) => {
        const testimonialBox = document.createElement("div");
        testimonialBox.classList.add("testimonial-box");
        testimonialBox.setAttribute("data-aos", "fade-right");
        testimonialBox.setAttribute("data-aos-offset", "100");
        testimonialBox.setAttribute("data-aos-duration", "1000");

        const boxTop = document.createElement("div");
        boxTop.classList.add("box-top");

        // Profile Section
        const profileDiv = document.createElement("div");
        profileDiv.classList.add("profile");

        const profileImgDiv = document.createElement("div");
        profileImgDiv.classList.add("profile-img");

        const profileImg = document.createElement("img");
        profileImg.src = "img/profile.png"; // Assuming each data item has a profile image URL property
        profileImgDiv.appendChild(profileImg);

        const nameUserDiv = document.createElement("div");
        nameUserDiv.classList.add("name-user");

        const nameStrong = document.createElement("strong");
        nameStrong.textContent = item.name; // Assuming each data item has a name property
        nameUserDiv.appendChild(nameStrong);

        profileDiv.appendChild(profileImgDiv);
        profileDiv.appendChild(nameUserDiv);

        // Reviews Section
        const reviewsDiv = document.createElement("div");
        reviewsDiv.classList.add("reviews");

        for (let i = 0; i < item.rating; i++) {
          const starIcon = document.createElement("i");
          starIcon.classList.add("fas", "fa-star");
          reviewsDiv.appendChild(starIcon);
        }

        boxTop.appendChild(profileDiv);
        boxTop.appendChild(reviewsDiv);
        testimonialBox.appendChild(boxTop);

        // Comments Section
        const clientCommentDiv = document.createElement("div");
        clientCommentDiv.classList.add("client-comment");

        const commentP = document.createElement("p");
        commentP.textContent = item.comment; // Assuming each data item has a comment property
        clientCommentDiv.appendChild(commentP);

        testimonialBox.appendChild(clientCommentDiv);

        testimonialBoxContainer.appendChild(testimonialBox);
      });
    } else {
      console.error("Error fetching data:", data);
      alert("Error fetching data. Please try again later.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Error fetching data. Please try again later.");
  }
};

window.addEventListener("scroll", function () {
  // Call AOS.refresh() to force AOS to reinitialize and reanimate elements
  AOS.refresh();
});

function redirectToNature() {
  window.location.href = "nature.html";
}

function redirectToSky() {
  window.location.href = "sky.html";
}

function redirectToAdventure() {
  window.location.href = "adventure.html";
}
