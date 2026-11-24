
let requests = [];

// Create emergency request
const createRequest = (req, res) => {
  const {
    id,
    student,
    type,
    location,
    description,
    priority,
    status,
    notes,
    time,
  } = req.body;

  if (!id || !student || !type || !location || !description) {
    return res.status(400).json({
      success: false,
      message: "Required fields are missing",
    });
  }

  if (requests.some((request) => request.id === id)) {
    return res.status(409).json({
      success: false,
      message: "Request already exists",
    });
  }

  const newRequest = {
    id,
    student,
    type,
    location,
    description,
    priority: priority || "Medium",
    status: status || "Pending",
    notes: notes || [],
    time: time || new Date().toLocaleString(),
  };

  requests.unshift(newRequest);

  // Send real-time notification to connected clients
  const io = req.app.get("io");

  if (io) {
    io.emit("new-emergency-request", newRequest);
  }

  res.status(201).json({
    success: true,
    message: "Request created successfully",
    data: newRequest,
  });
};

// Get all requests
const getRequests = (req, res) => {
  res.status(200).json({
    success: true,
    count: requests.length,
    data: requests,
  });
};

// Update request
const updateRequest = (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  const index = requests.findIndex(
    (request) => request.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Request not found",
    });
  }

  if (status !== undefined) {
    const allowedStatuses = [
      "Pending",
      "Acknowledged",
      "In Progress",
      "Resolved",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }
  }

  requests[index] = {
    ...requests[index],
    ...(status !== undefined && { status }),
    ...(notes !== undefined && { notes }),
  };

  res.status(200).json({
    success: true,
    message: "Request updated successfully",
    data: requests[index],
  });
};

module.exports = {
  createRequest,
  getRequests,
  updateRequest,
};
