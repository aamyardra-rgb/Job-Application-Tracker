document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("application-form");
  const list = document.getElementById("application-list");

  let applications = JSON.parse(localStorage.getItem("applications")) || [];

  function renderApplications() {
    list.innerHTML = "";
    applications.forEach((app, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${app.company}</td>
        <td>${app.position}</td>
        <td>${app.dateApplied}</td>
        <td class="status-${app.status.toLowerCase()}">${app.status}</td>
        <td>${app.notes || ""}</td>
        <td>
          <button onclick="deleteApplication(${index})">Delete</button>
        </td>
      `;
      list.appendChild(row);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const company = document.getElementById("company").value;
    const position = document.getElementById("position").value;
    const dateApplied = document.getElementById("dateApplied").value;
    const status = document.getElementById("status").value;
    const notes = document.getElementById("notes").value;

    applications.push({ company, position, dateApplied, status, notes });
    localStorage.setItem("applications", JSON.stringify(applications));
    renderApplications();
    form.reset();
  });

  window.deleteApplication = (index) => {
    applications.splice(index, 1);
    localStorage.setItem("applications", JSON.stringify(applications));
    renderApplications();
  };

  renderApplications();
});