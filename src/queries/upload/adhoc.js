const adhocUploadQuery = (cursor, pageSize) => {
    return `SELECT Top ${pageSize} r.OID as id, r.SequenceNumber, r.Type, r.Priority, r.HandlingResource,r.Zone,r.AgencyName,r.DispatchGroup,
                                     r.IncidentNumber,r.PrimaryResponse,r.CreationDate,r.ClassificationName, 
                                     r.DispatcherDisplayName, r.DispatcherLogonName,r.CreationTime,
                                     r.StatusTime,r.IncidentCreationTime,r.ResponseLocation,
                                     r.RespAlarmLevel,r.PrimaryResource,r.MilestoneName,r.OriginName,
                                     r.PersonCount,r.Status,r.ImportDateTime,r.ResponseTypeCategory,
                                     p.CreationTime, p.Dispatch, p.Disposition, p.Completion,
                                     ra.AgencyName, ra.IsPrimaryUnit, ra.ResourceName, ra.ResourceDescription, ra.StationName, ra.XCoordinate, ra.YCoordinate, ra.AssignOdometerOut, ra.AssignOdometerOut,
                                     ca.CallerName, ca.PhoneNumber, ca.PhoneNumberExt, ca.FreeFormatAddress,ca.ESN,ca.Near,ca.Age,ca.IsPhoneOwner, ca.Gender,ca.SIN,
                                     co.TimeStamp1, co.Info, co.AgentName, co.AgentDisplayName, co.Workstation, co.CommentTypeOID
                                  FROM Responses r 
                                  LEFT JOIN ProcessTimes p ON r.OID = p.ResponseOID
                                  LEFT JOIN ResourcesAssigned ra ON r.OID  = ra.ResponseOID
                                  LEFT JOIN Call ca ON r.OID  = ca.ResponseOID
                                  LEFT JOIN Comment co ON r.OID  = co.ResponseOID
                                  WHERE r.OID > ${cursor}
                                  ORDER BY OID
  `;
};

module.exports = { adhocUploadQuery };