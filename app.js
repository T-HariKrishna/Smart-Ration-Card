// AP Rice Card Generator Logic

// Default Avatar SVG representing the Head of Family
const DEFAULT_HOF_PHOTO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" width="100%" height="100%">
    <rect width="100" height="120" fill="#a4d1f2"/>
    <!-- Hair back -->
    <circle cx="50" cy="52" r="30" fill="#18181b"/>
    <!-- Neck -->
    <rect x="42" y="72" width="16" height="15" fill="#92400e"/>
    <!-- Shoulders & Saree -->
    <path d="M 12 115 C 12 90 28 82 50 82 C 72 82 88 90 88 115 Z" fill="#ea580c"/>
    <path d="M 48 82 C 58 82 72 88 88 115 L 42 115 Z" fill="#ca8a04"/> 
    <circle cx="62" cy="98" r="3" fill="#facc15"/>
    <circle cx="70" cy="106" r="3" fill="#facc15"/>
    <!-- Face -->
    <ellipse cx="50" cy="50" rx="21" ry="25" fill="#d97706"/>
    <!-- Hair front -->
    <path d="M 29 48 C 29 30 36 22 50 22 C 64 22 71 30 71 48 C 71 35 64 28 50 28 C 36 28 29 35 29 48 Z" fill="#18181b"/>
    <!-- Bindi -->
    <circle cx="50" cy="40" r="2.5" fill="#dc2626"/>
    <!-- Eyes -->
    <ellipse cx="42" cy="50" rx="3.5" ry="1.8" fill="#ffffff"/>
    <circle cx="42" cy="50" r="1.5" fill="#18181b"/>
    <ellipse cx="58" cy="50" rx="3.5" ry="1.8" fill="#ffffff"/>
    <circle cx="58" cy="50" r="1.5" fill="#18181b"/>
    <!-- Eyebrows -->
    <path d="M 36 46 C 39 44 45 45 47 47" fill="none" stroke="#18181b" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M 64 46 C 61 44 55 45 53 47" fill="none" stroke="#18181b" stroke-width="1.2" stroke-linecap="round"/>
    <!-- Nose -->
    <path d="M 50 47 L 50 56 L 47 57" fill="none" stroke="#78350f" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="52" cy="56" r="0.8" fill="#facc15"/> 
    <!-- Lips -->
    <path d="M 44 63 C 46 66 54 66 56 63 C 55 61 45 61 44 63 Z" fill="#dc2626"/>
</svg>`;

// Sample Data Matching User Images
const SAMPLE_DATA = {
  cardType: "NFSA/AAY",
  cardNo: "2814262002",
  hofName: "తలారి లక్ష్మిదేవి",
  hofDob: "11-05-1975",
  hofAge: "50",
  hofGender: "Female / ఆడ",
  membersCount: "4",
  shopId: "1346031",
  shopAddress: "అంకిరెడ్డిపల్లి 1, కొలిమిగుండ్ల",
  permanentAddress:
    "4-149-ఎ, అంకిరెడ్డిపల్లె కొలిమిగుండ్ల, కొలిమిగుండ్ల, కర్నూలు జిల్లా, ఆంధ్ర",
  tahsildarOffice: "కొలిమిగుండ్ల",
  cardSerial: "V12427558",
  qrContent: "https://aepos.ap.gov.in/Qcodesearch.jsp?rcno=2814262002",
  tollFree: "1967",
  familyMembers: [
    {
      no: "02",
      name: "తలారి హరికృష్ణ",
      dobAge: "24-03-2003/22",
      gender: "మగ",
      relation: "కొడుకు",
    },
    {
      no: "03",
      name: "తలారి రాముడు",
      dobAge: "12-05-1964/61",
      gender: "మగ",
      relation: "భర్త",
    },
    {
      no: "04",
      name: "తలారి రాముడు",
      dobAge: "12-05-1964/61",
      gender: "మగ",
      relation: "భర్త",
    },
    {
      no: "05",
      name: "తలారి వీర శంకర్",
      dobAge: "25-02-1998/27",
      gender: "మగ",
      relation: "కొడుకు",
    },
  ],
};

// Application State
let cardState = { ...SAMPLE_DATA };

// On DOM Load
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

// Initialize Application Bindings
function initApp() {
  // Fill default photo if none uploaded
  const photoImg = document.getElementById("card-photo");
  photoImg.src =
    "data:image/svg+xml;utf8," + encodeURIComponent(DEFAULT_HOF_PHOTO_SVG);
  document.getElementById("upload-preview-container").innerHTML =
    DEFAULT_HOF_PHOTO_SVG;

  // Load State into Inputs and Render Card
  loadStateToInputs();
  updateCardPreview();

  // Bind event listeners
  bindInputEvents();
}

// Load State into Input Form
function loadStateToInputs() {
  document.getElementById("input-card-type").value = cardState.cardType;
  document.getElementById("input-card-no").value = cardState.cardNo;
  document.getElementById("input-hof-name").value = cardState.hofName;
  document.getElementById("input-hof-dob").value = cardState.hofDob;
  document.getElementById("input-hof-age").value = cardState.hofAge;
  document.getElementById("input-hof-gender").value = cardState.hofGender;
  document.getElementById("input-members-count").value = cardState.membersCount;
  document.getElementById("input-shop-id").value = cardState.shopId;
  document.getElementById("input-shop-address").value = cardState.shopAddress;
  document.getElementById("input-permanent-address").value =
    cardState.permanentAddress;
  document.getElementById("input-tahsildar-office").value =
    cardState.tahsildarOffice;
  document.getElementById("input-card-serial").value = cardState.cardSerial;
  document.getElementById("input-qr-content").value = cardState.qrContent;
  document.getElementById("input-toll-free").value = cardState.tollFree;

  renderFamilyMembersEditor();
}

// Bind all form changes to live state
function bindInputEvents() {
  const inputs = [
    { id: "input-card-type", key: "cardType" },
    { id: "input-card-no", key: "cardNo" },
    { id: "input-hof-name", key: "hofName" },
    { id: "input-hof-dob", key: "hofDob" },
    { id: "input-hof-age", key: "hofAge" },
    { id: "input-hof-gender", key: "hofGender" },
    { id: "input-members-count", key: "membersCount" },
    { id: "input-shop-id", key: "shopId" },
    { id: "input-shop-address", key: "shopAddress" },
    { id: "input-permanent-address", key: "permanentAddress" },
    { id: "input-tahsildar-office", key: "tahsildarOffice" },
    { id: "input-card-serial", key: "cardSerial", callback: syncSerial },
    { id: "input-qr-content", key: "qrContent" },
    { id: "input-toll-free", key: "tollFree" },
  ];

  inputs.forEach((item) => {
    const element = document.getElementById(item.id);
    if (element) {
      element.addEventListener("input", (e) => {
        cardState[item.key] = e.target.value;
        if (item.callback) item.callback(e.target.value);
        updateCardPreview();
      });
    }
  });

  // Image Upload Event
  const fileInput = document.getElementById("input-photo");
  if (fileInput) {
    fileInput.addEventListener("change", handlePhotoUpload);
  }
}

// Sync Serial change with default QR content if it is standard epos URL
function syncSerial(serialVal) {
  const qrInput = document.getElementById("input-qr-content");
  if (
    qrInput &&
    (qrInput.value.includes("/ricecard/") || qrInput.value === "")
  ) {
    const newQr = `https://epos.ap.gov.in/ricecard/${serialVal}`;
    qrInput.value = newQr;
    cardState.qrContent = newQr;
  }
}

// Photo Upload Handler
function handlePhotoUpload(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;

      // Update UI preview element
      const previewContainer = document.getElementById(
        "upload-preview-container",
      );
      previewContainer.innerHTML = `<img src="${dataUrl}" alt="Preview">`;

      // Update Card image
      document.getElementById("card-photo").src = dataUrl;
    };
    reader.readAsDataURL(file);
  }
}

// Update live previews on Rice Card divs
function updateCardPreview() {
  // Front Card
  document.getElementById("card-type-val").innerText = cardState.cardType;
  document.getElementById("card-no-val").innerText = cardState.cardNo;
  document.getElementById("hof-name-val").innerText = cardState.hofName;
  document.getElementById("hof-dob-age-val").innerText =
    `${cardState.hofDob}/${cardState.hofAge} సం.`;
  document.getElementById("hof-gender-val").innerText = cardState.hofGender;
  document.getElementById("members-count-val").innerText =
    cardState.membersCount;
  document.getElementById("shop-id-val").innerText = cardState.shopId;
  document.getElementById("shop-address-val").innerText = cardState.shopAddress;
  document.getElementById("card-serial-val-vertical").innerText =
    cardState.cardSerial;

  // Back Card
  document.getElementById("back-address-val").innerText =
    cardState.permanentAddress;
  document.getElementById("back-tahsildar-val").innerText =
    cardState.tahsildarOffice;
  document.getElementById("back-serial-val-horizontal").innerText =
    cardState.cardSerial;
  document.getElementById("back-toll-free-val").innerText = cardState.tollFree;

  // QR Code rendering
  generateQRCode();

  // Render Back Card Table
  renderCardMembersTable();
}

// QR Code Generator (Uses library with offline fallback)
function generateQRCode() {
  const container = document.getElementById("card-qrcode");
  container.innerHTML = ""; // Clear old QR

  if (typeof QRCode !== "undefined" && cardState.qrContent.trim() !== "") {
    try {
      new QRCode(container, {
        text: cardState.qrContent,
        width: 62,
        height: 62,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M,
      });
    } catch (err) {
      console.error("QR Code library generation error:", err);
      drawFallbackQRCode(container);
    }
  } else {
    drawFallbackQRCode(container);
  }
}

// Fallback Canvas QR rendering if library fails or is offline
function drawFallbackQRCode(container) {
  const canvas = document.createElement("canvas");
  canvas.width = 62;
  canvas.height = 62;
  const ctx = canvas.getContext("2d");

  // Draw simple QR lookalike mock pattern
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 62, 62);
  ctx.fillStyle = "white";
  ctx.fillRect(2, 2, 58, 58);

  // Position Finder Patterns
  drawFinderPattern(ctx, 4, 4);
  drawFinderPattern(ctx, 44, 4);
  drawFinderPattern(ctx, 4, 44);

  // Draw random blocky data dots
  ctx.fillStyle = "black";
  for (let x = 20; x < 42; x += 3) {
    for (let y = 4; y < 58; y += 3) {
      if (Math.random() > 0.4) ctx.fillRect(x, y, 2, 2);
    }
  }
  for (let x = 4; x < 20; x += 3) {
    for (let y = 20; y < 42; y += 3) {
      if (Math.random() > 0.4) ctx.fillRect(x, y, 2, 2);
    }
  }
  for (let x = 44; x < 58; x += 3) {
    for (let y = 20; y < 58; y += 3) {
      if (Math.random() > 0.4) ctx.fillRect(x, y, 2, 2);
    }
  }

  container.appendChild(canvas);
}

function drawFinderPattern(ctx, x, y) {
  ctx.fillStyle = "black";
  ctx.fillRect(x, y, 14, 14);
  ctx.fillStyle = "white";
  ctx.fillRect(x + 2, y + 2, 10, 10);
  ctx.fillStyle = "black";
  ctx.fillRect(x + 4, y + 4, 6, 6);
}

// FAMILY MEMBERS LOGIC (Sidebar Editor)
function renderFamilyMembersEditor() {
  const tbody = document.getElementById("editor-members-body");
  tbody.innerHTML = "";

  cardState.familyMembers.forEach((member, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${member.no}</td>
            <td style="font-weight: 600;">${member.name}</td>
            <td>${member.dobAge}</td>
            <td>${member.gender}</td>
            <td>${member.relation}</td>
            <td>
                <button class="action-icon-btn" onclick="deleteFamilyMember(${index})" title="Delete Member">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
        `;
    tbody.appendChild(row);
  });
}

// Render dynamic rows in the physical card layout (back page)
function renderCardMembersTable() {
  const tbody = document.getElementById("card-members-rows");
  tbody.innerHTML = "";

  // Fill table with active family members
  cardState.familyMembers.forEach((member) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${member.no}</td>
        <td class="font-telugu">${member.name}</td>
        <td>${member.dobAge}</td>
        <td class="font-telugu">${member.gender}</td>
        <td class="font-telugu">${member.relation}</td>
    `;

    tbody.appendChild(row);
  });

  // Always maintain exactly 6 rows
  const maxRows = 6;
  const currentCount = cardState.familyMembers.length;

  for (let i = currentCount; i < maxRows; i++) {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    `;

    tbody.appendChild(row);
  }
}
const memberCount = cardState.familyMembers.length;

const table = document.getElementById("card-members-table");

if (memberCount > 6) {
  table.classList.add("compact-members");
} else {
  table.classList.remove("compact-members");
}

// Add New Family Member Functions
function openAddMemberModal() {
  document.getElementById("add-member-modal").classList.add("active");

  // Auto populate index number
  const nextIndex = cardState.familyMembers.length + 2;
  const paddedIndex = String(nextIndex).padStart(2, "0");

  // Clear old values in fields
  document.getElementById("modal-member-name").value = "";
  document.getElementById("modal-member-dob").value = "";
  document.getElementById("modal-member-age").value = "";
  document.getElementById("modal-member-relation").value = "";
}

function closeAddMemberModal() {
  document.getElementById("add-member-modal").classList.remove("active");
}

function submitAddMember() {
  const name = document.getElementById("modal-member-name").value.trim();
  const dob = document.getElementById("modal-member-dob").value.trim();
  const age = document.getElementById("modal-member-age").value.trim();
  const gender = document.getElementById("modal-member-gender").value;
  const relation = document
    .getElementById("modal-member-relation")
    .value.trim();

  if (name === "" || dob === "" || age === "" || relation === "") {
    alert("Please fill out all the fields.");
    return;
  }

  const nextIndex = cardState.familyMembers.length + 2;
  const paddedIndex = String(nextIndex).padStart(2, "0");

  const newMember = {
    no: paddedIndex,
    name: name,
    dobAge: `${dob}/${age}`,
    gender: gender,
    relation: relation,
  };

  cardState.familyMembers.push(newMember);

  // Recalculate members count in state and input
  cardState.membersCount = String(cardState.familyMembers.length + 1); // Family size = members + Head
  document.getElementById("input-members-count").value = cardState.membersCount;

  // Refresh components
  renderFamilyMembersEditor();
  updateCardPreview();
  closeAddMemberModal();
}

function deleteFamilyMember(index) {
  if (confirm("Are you sure you want to remove this family member?")) {
    cardState.familyMembers.splice(index, 1);

    // Renumber remaining family members so it always stays sequential
    cardState.familyMembers.forEach((member, idx) => {
      member.no = String(idx + 2).padStart(2, "0");
    });

    // Recalculate members count
    cardState.membersCount = String(cardState.familyMembers.length + 1);
    document.getElementById("input-members-count").value =
      cardState.membersCount;

    renderFamilyMembersEditor();
    updateCardPreview();
  }
}

// Reset data to default sample values
function resetToSample() {
  if (confirm("Reset card configuration back to original image values?")) {
    cardState = JSON.parse(JSON.stringify(SAMPLE_DATA));

    // Reset image
    const photoImg = document.getElementById("card-photo");
    photoImg.src =
      "data:image/svg+xml;utf8," + encodeURIComponent(DEFAULT_HOF_PHOTO_SVG);
    document.getElementById("upload-preview-container").innerHTML =
      DEFAULT_HOF_PHOTO_SVG;
    document.getElementById("input-photo").value = "";

    loadStateToInputs();
    updateCardPreview();
  }
}

// Sidebar Tab switching logic
function switchTab(tabId) {
  document
    .querySelectorAll(".tab-btn")
    .forEach((btn) => btn.classList.remove("active"));
  document
    .querySelectorAll(".tab-content")
    .forEach((content) => content.classList.remove("active"));

  // Find trigger button
  let btnElement;
  if (tabId === "front-tab")
    btnElement = document.querySelector("button[onclick*='front-tab']");
  else if (tabId === "back-tab")
    btnElement = document.querySelector("button[onclick*='back-tab']");
  else btnElement = document.querySelector("button[onclick*='settings-tab']");

  if (btnElement) btnElement.classList.add("active");

  const targetTab = document.getElementById(tabId);
  if (targetTab) targetTab.classList.add("active");
}

// Live Preview toggling logic
function toggleCardView(view) {
  document
    .querySelectorAll(".toggle-btn")
    .forEach((btn) => btn.classList.remove("active"));

  const previewArea = document.querySelector(".preview-area");
  previewArea.setAttribute("data-view", view);

  document.getElementById(`btn-view-${view}`).classList.add("active");
}

// Adjust zoom level of preview cards on page
function adjustCardScale(zoomVal) {
  const scaleVal = parseFloat(zoomVal);
  const wrapper = document.getElementById("cards-wrapper");
  wrapper.style.transform = `scale(${scaleVal})`;

  document.getElementById("scale-val-indicator").innerText =
    `${Math.round(scaleVal * 100)}%`;
}

// Print Handler (opens native system print layout)
function printCard() {
  window.print();
}
