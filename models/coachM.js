const con = require("../config/dbConfig");
let query = "",
  message = "";

function switchResponse(data) {
  return new Promise(async function (resolve, reject) {
    query =
      "UPDATE switchschedulerequest SET status = ? WHERE toCoachId = ? AND id = ? ";
    let param = [data.action, data.profile.coachId, data.switchId];
    try {
      await con.query(query, param, async function (err, result) {
        if (err) {
          console.log("ERRRORRR", err);
          message = {
            responseCode: process.env.ERRORINTERNAL_RESPONSE,
            responseMessage: process.env.INTERNALERROR_MESSAGE,
          };
          resolve(message);
        } else {
          if (result.affectedRows > 0) {
            let a = await getDataSCR(data);
            switch (a.responseCode) {
              case "200":
                a.data[0].coachId = data.profile.coachId;
                if (data.action == "yes") {
                  let b = await updateClassSchedule(a.data[0]);
                  message = b;
                } else {
                  message = {
                    responseCode: process.env.SUCCESS_RESPONSE,
                    responseMessage: process.env.SUCCESS_MESSAGE,
                  };
                }
                break;
              default:
                message = a;
                break;
            }
            console.log(message);
            resolve(message);
          } else {
            message = {
              responseCode: process.env.NOTACCEPT_RESPONSE,
              responseMessage: "Oopss data doesn't match, Please try again",
            };
            resolve(message);
          }
        }
      });
    } catch (err) {
      console.log(err);
      message = {
        responseCode: process.env.ERRORINTERNAL_RESPONSE,
        responseMessage: process.env.INTERNALERROR_MESSAGE,
      };
      resolve(message);
    }
  });
}

function getDataSCR(data) {
  return new Promise(async function (resolve, reject) {
    query = "Select * from switchschedulerequest WHERE id = ?";
    let param = [data.switchId];
    await con.query(query, param, async function (err, result) {
      if (result.length > 0) {
        message = {
          responseCode: process.env.SUCCESS_RESPONSE,
          responseMessage: process.env.SUCCESS_MESSAGE,
          data: result,
        };
        resolve(message);
      } else {
        message = {
          responseCode: process.env.NOTFOUND_RESPONSE,
          responseMessage: process.env.DATANOTFOUND_MESSAGE,
        };
        resolve(message);
      }
    });
  });
}

function updateClassSchedule(data) {
  return new Promise(async function (resolve, reject) {
    updateTo = "UPDATE classschedule SET coach = ? WHERE id = ? ";
    let paramTo = [data.toCoachId, data.fromScheduleId];
    await con.query(updateTo, paramTo, async function (err, result) {
      if (err) {
        message = {
          responseCode: process.env.ERRORINTERNAL_RESPONSE,
          responseMessage: process.env.INTERNALERROR_MESSAGE,
        };
        resolve(message);
      } else {
        if (result.affectedRows > 0) {
          updateFrom = "UPDATE classschedule SET coach = ? WHERE id = ? ";
          let paramFrom = [data.fromCoachId, data.toScheduleId];
          await con.query(updateFrom, paramFrom, async function (err, result) {
            if (err) {
              console.log(err);
              message = {
                responseCode: process.env.ERRORINTERNAL_RESPONSE,
                responseMessage: process.env.INTERNALERROR_MESSAGE,
              };
              resolve(message);
            } else {
              if (result.affectedRows > 0) {
                message = {
                  responseCode: process.env.SUCCESS_RESPONSE,
                  responseMessage: process.env.SUCCESS_MESSAGE,
                };
                resolve(message);
              } else {
                message = {
                  responseCode: process.env.ERRORINTERNAL_RESPONSE,
                  responseMessage: process.env.INTERNALERROR_MESSAGE,
                };
                resolve(message);
              }
            }
          });
        } else {
          message = {
            responseCode: process.env.ERRORINTERNAL_RESPONSE,
            responseMessage: process.env.INTERNALERROR_MESSAGE,
          };
          resolve(message);
        }
      }
    });
  });
}

function actionClass(data) {
  return new Promise(async function (resolve, reject) {
    query = "INSERT INTO coachactivity SET ?";
    let param = {
      scheduleId: data.scheduleId,
      coachId: data.profile.id,
      action: data.action,
    };
    await con.query(query, param, async function (err, result) {
      if (err) {
        console.log("error get data", err);
        message = {
          responseCode: process.env.ERRORINTERNAL_RESPONSE,
          responseMessage: process.env.INTERNALERROR_MESSAGE,
        };
        resolve(message);
      } else {
        if (result.affectedRows > 0) {
          message = {
            responseCode: process.env.SUCCESS_RESPONSE,
            responseMessage: process.env.SUCCESS_MESSAGE,
          };
          resolve(message);
        } else {
          message = {
            responseCode: process.env.ERRORINTERNAL_RESPONSE,
            responseMessage: process.env.INTERNALERROR_MESSAGE,
          };
          resolve(message);
        }
      }
    });
  });
}

async function getDateToday() {
  try {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    const fullDate = yyyy + "-" + mm + "-" + dd;
    return fullDate;
  } catch (err) {
    consoles.log("error geting date", err);
    return err;
  }
}

function checkSwitchClassRequest(data) {
  return new Promise(async function (resolve, reject) {
    try {
      query =
        "SELECT id FROM switchschedulerequest WHERE fromCoachId = " +
        data.selfId +
        " AND toCoachId = " +
        data.targetCoach +
        " AND fromScheduleId = " +
        data.idSelfSchedule +
        " AND toScheduleId = " +
        data.targetSchedule;
      await con.query(query, (err, result) => {
        if (err) {
          console.log("error get data", err);
          message = {
            responseCode: process.env.ERRORINTERNAL_RESPONSE,
            responseMessage: process.env.INTERNALERROR_MESSAGE,
          };
          resolve(message);
        } else {
          if (result.length > 0) {
            message = {
              responseCode: process.env.NOTACCEPT_RESPONSE,
              responseMessage: "Oopss data already exists !",
            };
            resolve(message);
          } else {
            message = {
              responseCode: process.env.NOTFOUND_RESPONSE,
              responseMessage: process.env.DATANOTFOUND_MESSAGE,
            };
            resolve(message);
          }
        }
      });
    } catch (err) {
      console.log("error check switch class", err);
      message = {
        responseCode: process.env.ERRORINTERNAL_RESPONSE,
        responseMessage: process.env.INTERNALERROR_MESSAGE,
      };
      resolve(message);
    }
  });
}

function updateCoachClassSchedule(data) {
  return new Promise(async function (resolve, reject) {
    try {
      let cscr = await checkSwitchClassRequest(data);
      switch (cscr.responseCode) {
        case "404":
          let today = await getDateToday();
          query = "INSERT INTO switchschedulerequest SET ?";
          let param = {
            fromCoachId: parseInt(data.selfId),
            toCoachId: parseInt(data.targetCoach),
            fromScheduleId: data.idSelfSchedule,
            toScheduleId: data.targetSchedule,
            requestDate: today,
          };
          // query = "UPDATE classschedule SET coach = ? WHERE id = ?  ";
          // let param = [data.targetCoach, data.idSelfSchedule];
          await con.query(query, param, async function (err, result) {
            if (err) {
              console.log("error get data", err);
              message = {
                responseCode: process.env.ERRORINTERNAL_RESPONSE,
                responseMessage: process.env.INTERNALERROR_MESSAGE,
              };
              resolve(message);
            } else {
              if (result.affectedRows > 0) {
                message = {
                  responseCode: process.env.SUCCESS_RESPONSE,
                  responseMessage: process.env.SUCCESS_MESSAGE,
                };
                resolve(message);
                // let query2 = "UPDATE classschedule SET coach = ? WHERE id = ?  ";
                // let param2 = [data.selfId, data.targetSchedule];
                // await con.query(query2,param2,(err, result) => {
                //     if(result.affectedRows > 0){
                //         message = {
                //             "responseCode": process.env.SUCCESS_RESPONSE,
                //             "responseMessage": process.env.SUCCESS_MESSAGE
                //         };
                //         resolve(message);
                //     }else{
                //         message = {
                //             "responseCode": process.env.NOTFOUND_RESPONSE,
                //             "responseMessage": process.env.DATANOTFOUND_MESSAGE
                //         };
                //         reject(message);
                //     }
                // })
              } else {
                message = {
                  responseCode: process.env.NOTFOUND_RESPONSE,
                  responseMessage: process.env.DATANOTFOUND_MESSAGE,
                };
                resolve(message);
              }
            }
          });
          break;
        default:
          resolve(cscr);
          break;
      }
    } catch (err) {
      console.log("error switch class request", err);
      message = {
        responseCode: process.env.ERRORINTERNAL_RESPONSE,
        responseMessage: process.env.ERRORSCHEDULE_MESSAGE,
      };
      resolve(message);
    }
  });
}

exports.coachUpdate = function (data) {
  return new Promise(async function (resolve, reject) {
    try {
      switch (data.param) {
        case "switchClass":
          // =====> Check specialization
          let s = data.profile.specialization.split(",");
          data.profile.specialization = s;
          let m = await matchingScheduleSwitch(data);
          switch (m.responseCode) {
            case process.env.SUCCESS_RESPONSE:
              // =====> request switch class
              message = await updateCoachClassSchedule(data);
              resolve(message);
              break;
            case process.env.NOTFOUND_RESPONSE:
              message = {
                responseCode: process.env.NOTACCEPT_RESPONSE,
                responseMessage: "Oops you can't switch with this schedule",
              };
              resolve(message);
              break;
            default:
              message = {
                responseCode: process.env.ERRORINTERNAL_RESPONSE,
                responseMessage: process.env.ERRORSCHEDULE_MESSAGE,
              };
              resolve(message);
              break;
          }
          // =====> End Check specialization
          break;
        case "actionClass":
          message = await actionClass(data);
          break;
        case "switchClassResponse":
          message = await switchResponse(data);
          break;
      }
      resolve(message);
    } catch (err) {
      console.log("error coachUpdate =>", err);
      message = {
        responseCode: process.env.ERRORINTERNAL_RESPONSE,
        responseMessage: process.env.ERRORSCHEDULE_MESSAGE,
      };
      resolve(message);
    }
  });
};

function matchingScheduleSwitch(data) {
  return new Promise(async function (resolve, reject) {
    try {
      let query =
        "SELECT * FROM classschedule cs WHERE cs.id = '" +
        data.targetSchedule +
        "' AND cs.class IN (" +
        data.profile.specialization +
        ")";
      await con.query(query, (err, result) => {
        if (err) {
          message = {
            responseCode: process.env.ERRORINTERNAL_RESPONSE,
            responseMessage: process.env.INTERNALERROR_MESSAGE,
          };
          resolve(message);
        } else {
          if (result.length > 0) {
            message = {
              responseCode: process.env.SUCCESS_RESPONSE,
              responseMessage: process.env.SUCCESS_MESSAGE,
              data: result,
            };
            resolve(message);
          } else {
            message = {
              responseCode: process.env.NOTFOUND_RESPONSE,
              responseMessage: process.env.DATANOTFOUND_MESSAGE,
            };
            resolve(message);
          }
        }
      });
    } catch (err) {
      console.log(err);
      message = {
        responseCode: process.env.ERRORINTERNAL_RESPONSE,
        responseMessage: process.env.INTERNALERROR_MESSAGE,
      };
      resolve(message);
    }
  });
}

exports.coachList = function (data) {
  return new Promise(async function (resolve, reject) {
    try {
      let query = "";
      switch (data.param) {
        case "all":
          query =
            "SELECT u.name, u.gender, u.phone, u.address, u.email, u.imgProfile, u.accountStatus, u.registerDate, p.name as placeName FROM classschedule cs JOIN coach c ON c.id = cs.coach JOIN user u ON u.id = c.userId JOIN place p ON p.id = cs.placeId WHERE p.partnerId = " +
            data.profile.partnerId +
            " GROUP BY u.id";
          break;
        default:
          if (data.param.byId) {
            query =
              "SELECT u.name, u.gender, u.phone, u.address, u.email, u.imgProfile, u.accountStatus, u.registerDate, p.name as placeName FROM classschedule cs JOIN coach c ON c.id = cs.coach JOIN user u ON u.id = c.userId JOIN place p ON p.id = cs.placeId WHERE p.partnerId = " +
              data.profile.partnerId +
              " AND c.id = " +
              data.param.byId +
              " AND cs.coach = " +
              data.param.byId;
          } else if (data.param.byPlace) {
            query =
              "SELECT u.name, u.gender, u.phone, u.address, u.email, u.imgProfile, u.accountStatus, u.registerDate, p.name as placeName FROM classschedule cs JOIN coach c ON c.id = cs.coach JOIN user u ON u.id = c.userId JOIN place p ON p.id = cs.placeId WHERE p.partnerId = " +
              data.profile.partnerId +
              " AND cs.placeId = " +
              data.param.byPlace +
              " GROUP BY u.id";
          } else if (data.param.byClass) {
            query =
              "SELECT u.name, u.gender, u.phone, u.address, u.email, u.imgProfile, u.accountStatus, u.registerDate, p.name as placeName FROM classschedule cs JOIN coach c ON c.id = cs.coach JOIN user u ON u.id = c.userId JOIN place p ON p.id = cs.placeId WHERE p.partnerId = " +
              data.profile.partnerId +
              " AND cs.class = " +
              data.param.byPlace +
              " GROUP BY u.id";
          }
          break;
      }
      console.log(query);
      await con.query(query, (err, result) => {
        if (err) {
          console.log("error get data", err);
          message = {
            responseCode: process.env.ERRORINTERNAL_RESPONSE,
            responseMessage: process.env.INTERNALERROR_MESSAGE,
          };
          resolve(message);
        } else {
          if (result.length > 0) {
            message = {
              responseCode: process.env.SUCCESS_RESPONSE,
              responseMessage: process.env.SUCCESS_MESSAGE,
              data: result,
            };
            resolve(message);
          } else {
            message = {
              responseCode: process.env.NOTFOUND_RESPONSE,
              responseMessage: process.env.DATANOTFOUND_MESSAGE,
            };
            resolve(message);
          }
        }
      });
    } catch (err) {
      console.log("error coach list", err);
      message = {
        responseCode: process.env.NOTFOUND_RESPONSE,
        responseMessage: process.env.DATANOTFOUND_MESSAGE,
      };
      reject(message);
    }
  });
};

exports.createSchedule = function (data) {
  return new Promise(async function (resolve, reject) {
    try {
      const otp = "INSERT INTO classschedule SET ?";
      con.query(
        otp, {
          class: parseInt(data.classId),
          coach: parseInt(data.coachId),
          startDate: data.startDate,
          endDate: data.endDate,
          startTime: data.startTime,
          endTime: data.endTime,
          placeId: parseInt(data.placeId),
          maxPerson: parseInt(data.maxPerson)
        },
        (err, result) => {
          if (!err) {
            if (result.affectedRows > 0) {
              message = {
                responseCode: process.env.SUCCESS_RESPONSE,
                responseMessage: process.env.SUCCESS_MESSAGE,
              };
              resolve(message);
            } else {
              message = {
                responseCode: process.env.SUCCESS_RESPONSE,
                responseMessage: process.env.ERRORSCHEDULE_MESSAGE,
              };
              resolve(message);
            }
          } else {
            console.log("created schedule error", err);
          }
        }
      );
    } catch (err) {
      console.log("error create schedule", err);
      reject(process.env.ERRORINTERNAL_RESPONSE);
    }
  });
};

exports.getSchedule = function (data) {
  return new Promise(async function (resolve, reject) {
    try {
      let query = "";
      if (data.filter == "all") {
        query =
          "SELECT cs.id as scheduleId ,u.id as coach_account_id,cl.name as class_name,u.name as coach_name,cs.coach as coach_id,cs.class as class_id,cs.startTime as class_start_time,cs.endTime as class_end_time,cs.startDate as class_start_date,cs.endDate as class_end_date FROM classschedule cs INNER JOIN classlist cl ON cs.class = cl.id INNER JOIN coach c ON c.id = cs.coach INNER JOIN user u ON u.id = c.userId ORDER BY cs.id DESC";
      } else if (data.filter == "startedClass") {
        query =
          "SELECT ca.*, cs.startTime, cs.endTime, cs.startDate, cs.endDate, cs.placeId, p.name, p.location FROM `coachactivity` ca JOIN classschedule cs ON cs.id = ca.scheduleId JOIN place p ON p.id = cs.placeId  WHERE ca.coachId = " +
          data.profile.coachId +
          " AND ca.action = '" +
          data.filter +
          "' ORDER BY ca.id DESC";
      } else if (data.filter == "switchRequest") {
        query =
          "SELECT scr.*, u1.name, cl1.name as className, cs1.startDate as fromStartDate, cs1.endDate as fromEndDate, cs1.startTime as fromStartTime, cs1.endTime as fromEndTime, cs2.startDate as toStartDate, cs2.endDate as toEndDate, cs2.startTime as toStartTime, cs2.endTime as toEndTime, cl2.name as toClassName FROM switchschedulerequest scr JOIN coach c1 ON c1.id = scr.fromCoachId JOIN user u1 ON u1.id = c1.userId JOIN classschedule cs1 ON cs1.id = scr.fromScheduleId JOIN classschedule cs2 ON cs2.id = scr.toScheduleId JOIN classlist cl1 ON cl1.id = cs1.class JOIN classlist cl2 ON cl2.id = cs2.class WHERE scr.toCoachId = '" +
          data.profile.coachId +
          "' ORDER BY scr.id DESC";
      } else {
        if (data.classStatus == "null") {
          query =
            "SELECT cs.id as scheduleId ,u.id as coach_account_id,cl.name as class_name,u.name as coach_name,cs.coach as coach_id,cs.class as class_id,cs.startTime as class_start_time,cs.endTime as class_end_time,cs.startDate as class_start_date,cs.endDate as class_end_date FROM classschedule cs INNER JOIN classlist cl ON cs.class = cl.id INNER JOIN coach c ON c.id = cs.coach INNER JOIN user u ON u.id = c.userId WHERE c.id = '" +
            data.profile.coachId +
            "' AND cs.id NOT IN ( SELECT ca.scheduleId FROM coachactivity ca  WHERE ca.coachId = '" +
            data.profile.coachId +
            "') ORDER BY cs.id DESC";
        } else if (data.classStatus == "started") {
          query =
            "SELECT cs.id as scheduleId ,u.id as coach_account_id,cl.name as class_name,u.name as coach_name,cs.coach as coach_id,cs.class as class_id,cs.startTime as class_start_time,cs.endTime as class_end_time,cs.startDate as class_start_date,cs.endDate as class_end_date, t2.action as classStatus, t2.dateTrain as actionDate FROM classschedule cs INNER JOIN classlist cl ON cs.class = cl.id AND cs.coach = '" +
            data.profile.coachId +
            "' INNER JOIN coach c ON c.id = cs.coach AND c.id = '" +
            data.profile.coachId +
            "' INNER JOIN user u ON u.id = c.userId AND u.id = '" +
            data.profile.id +
            "' JOIN ( SELECT t1.* FROM (SELECT ca.id, ca.scheduleId, ca.coachId, ca.action, ca.dateTrain FROM coachactivity ca WHERE ca.coachId = '" +
            data.profile.coachId +
            "' AND ca.action = 'started') t1 WHERE t1.scheduleId NOT IN (SELECT scheduleId FROM coachactivity WHERE coachId = '" +
            data.profile.coachId +
            "' AND action = 'finished')) t2 ON t2.scheduleId = cs.id WHERE cs.coach = '" +
            data.profile.coachId +
            "' AND t2.coachId = '" +
            data.profile.coachId +
            "' ORDER BY cs.id DESC";
        } else if (data.classStatus == "finished") {
          query =
            "SELECT cs.id as scheduleId ,u.id as coach_account_id,cl.name as class_name,u.name as coach_name,cs.coach as coach_id,cs.class as class_id,cs.startTime as class_start_time,cs.endTime as class_end_time,cs.startDate as class_start_date,cs.endDate as class_end_date, ca.action as classStatus FROM classschedule cs INNER JOIN classlist cl ON cs.class = cl.id INNER JOIN coach c ON c.id = cs.coach INNER JOIN user u ON u.id = c.userId JOIN coachactivity ca ON ca.scheduleId = cs.id WHERE c.id = '" +
            data.profile.coachId +
            "' AND ca.action = '" +
            data.classStatus +
            "' ORDER BY cs.id DESC";
        }
      }
      await con.query(query, (err, result) => {
        if (err) {
          console.log("error get data", err);
          message = {
            responseCode: process.env.ERRORINTERNAL_RESPONSE,
            responseMessage: process.env.INTERNALERROR_MESSAGE,
          };
          resolve(message);
        } else {
          if (result.length > 0) {
            message = {
              responseCode: process.env.SUCCESS_RESPONSE,
              responseMessage: process.env.SUCCESS_MESSAGE,
              data: result,
            };
            resolve(message);
          } else {
            message = {
              responseCode: process.env.NOTFOUND_RESPONSE,
              responseMessage: process.env.DATANOTFOUND_MESSAGE,
            };
            resolve(message);
          }
        }
      });
    } catch (err) {
      console.log("error create schedule", err);
      reject(err);
    }
  });
};

exports.activity = function (data) {
  return new Promise(async function (resolve, reject) {
    try {
      const otp = "INSERT INTO coachactivity SET ?";
      con.query(
        otp, {
          classScheduleId: parseInt(data.classId),
        },
        (err, result) => {
          if (!err) {
            if (result.affectedRows > 0) {
              message = {
                responseCode: process.env.SUCCESS_RESPONSE,
                responseMessage: process.env.SUCCESS_MESSAGE,
              };
              resolve(message);
            } else {
              message = {
                responseCode: process.env.NOTACCEPT_RESPONSE,
                responseMessage: process.env.ERRORSCHEDULE_MESSAGE,
              };
              resolve(message);
            }
          } else {
            console.log("created schedule error", err);
          }
        }
      );
    } catch (err) {
      console.log("error create schedule", err);
      reject(err);
    }
  });
};