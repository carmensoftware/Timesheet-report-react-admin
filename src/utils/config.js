const config = {
    apiUrl: `http://app.blueledgers.com:88/carmen.dev.api`,
    adminToken: "602380b9f449404d7d6f6aaffcee4bd5",
  };
  
  const config2 = {
    apiUrl: `http://cloud.carmensoftware.com/Carmen.Demo`,
    adminToken: "70ff70b09e1ee5b9e7155fda6b9a59e2",
  };
  
  const ArrCompany = [
    {
      apiUrl: `http://app.blueledgers.com:88/carmen.dev.api`,
      adminToken: "602380b9f449404d7d6f6aaffcee4bd5",
    },
    {
      apiUrl: `http://cloud.carmensoftware.com/Carmen.Demo`,
      adminToken: "70ff70b09e1ee5b9e7155fda6b9a59e2",
    },
  ];
  
  export default { ...config, listOfCompany: ArrCompany };
  