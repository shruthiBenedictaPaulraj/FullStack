const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/Fullstack', (err, db) => {
        if (err) return console.log(err);
        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

/** User Mangement table implementation starts here */
router.post('/addUser', (req, res) => {
    let value = {
        'firstName': req.body.firstName,
        'lastName': req.body.lastName,
        'empId': req.body.empId,
        'userId': ObjectId()
    }
    connection((db) => {
        db.collection('userTable')
            .insert(value)
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.put('/addUser', (req, res) => {
    connection((db) => {
        db.collection('userTable')
            .update({ userId: ObjectId(req.body.userId) }, {
                $set: {
                    firstName: req.body.firstName, lastName: req.body.lastName,
                    empId: req.body.empId
                }
            })
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.get('/getUser', (req, res) => {
    connection((db) => {
        db.collection('userTable')
            .find()
            .toArray()
            .then((users) => {
                let val = [];
                for (i in users) {
                    let obj = {
                        'firstName': users[i].firstName,
                        'lastName': users[i].lastName,
                        'empId': users[i].empId,
                        'userId': users[i].userId
                    }
                    val.push(obj);
                }
                response.data = val;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});


router.delete('/deleteUser/:id', (req, res) => {
    connection((db) => {
        db.collection('userTable')
            .remove({ userId: ObjectId(req.params.id) }, 1)
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

/** User Mangement table implementation ends here */

/** Project table implementation starts here */

router.post('/addProject', (req, res) => {
    let status = 'Not Updated';
    if (Date.parse(req.body.startDate) > new Date() && Date.parse(req.body.endDate) > new Date()) {
        status = 'Yet to start';
    } else if (Date.parse(req.body.startDate) < new Date() && Date.parse(req.body.endDate) < new Date()) {
        status = 'Completed';
    } else if (Date.parse(req.body.startDate) < new Date() && Date.parse(req.body.endDate) > new Date()) {
        status = 'In-Progress';
    }
    let value = {
        'projectName': req.body.projectName,
        'startDate': req.body.startDate,
        'endDate': req.body.endDate,
        'priority': req.body.priority,
        'manager': req.body.manager,
        'status': status,
        'noOfTasks': 0,
        'projectId': ObjectId()
    }
    connection((db) => {
        db.collection('projectListTable')
            .insert(value)
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.put('/addProject', (req, res) => {
    let statusTemp = 'Not Updated';
    if (Date.parse(req.body.startDate) > new Date() && Date.parse(req.body.endDate) > new Date()) {
        statusTemp = 'Yet to start';
    } else if (Date.parse(req.body.startDate) < new Date() && Date.parse(req.body.endDate) < new Date()) {
        statusTemp = 'Completed';
    } else if (Date.parse(req.body.startDate) < new Date() && Date.parse(req.body.endDate) > new Date()) {
        statusTemp = 'In-Progress';
    }
    connection((db) => {
        db.collection('projectListTable')
            .update({ projectId: ObjectId(req.body.projectId) }, {
                $set: {
                    projectName: req.body.projectName,
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                    priority: req.body.priority,
                    manager: req.body.manager,
                    status: statusTemp
                }
            })
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.get('/getProject', (req, res) => {
    connection((db) => {
        db.collection('projectListTable')
            .find()
            .toArray()
            .then((project) => {
                var projectList = project;
                db.collection('taskTable')
                    .find()
                    .toArray()
                    .then((task) => {
                        var taskListData = task;
                        db.collection('userTable')
                        .find()
                        .toArray()
                        .then((manager) => {
                            let temp = [];
                            for (let i = 0; i < manager.length; i++) {
                                let managerModel = {
                                    'firstName': manager[i].firstName,
                                    'lastName': manager[i].lastName,
                                    'managerId': manager[i].userId,
                                }
                                temp.push(managerModel);
                            }
                            var obj = {
                                'projectList': projectList,
                                'managerList': temp,
                                'taskList': taskListData
                            }
                            response.data = obj;
                            res.json(response);
                        })
                        .catch((err) => {
                            sendError(err, res);
                        });
                    })
                    .catch((err) => {
                        sendError(err, res);
                    });
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.delete('/suspendProject/:id', (req, res) => {
    connection((db) => {
        db.collection('projectListTable')
            .remove({ projectId: ObjectId(req.params.id) }, 1)
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

/** Project table implementation ends here */

/** Task table implementation starts here */

router.get('/addTaskGet', (req, res) => {
    var tasklist = null;
    var value = [];
    var taskDataList = [];
    connection((db) => {
        db.collection('projectListTable')
            .find()
            .toArray()
            .then((project) => {
                var projectList = project;
                db.collection('taskTable')
                    .find()
                    .toArray()
                    .then((taskData) => {
                        taskDataList = taskData;
                        for (var i = 0; i < projectList.length; i++) {
                            var flag = false;
                            for (var j = 0; j < taskDataList.length; j++) {
                                if (!projectList[i]['projectId'].length && projectList[i]['projectId'].equals(taskDataList[j]['projectId'])) {
                                    var obj = {
                                        'parentTask': {
                                            'parentTaskName': taskDataList[j].parentTask.parentTaskName,
                                            'parentTaskId': taskDataList[j].parentTask.parentTaskName
                                        },
                                        'taskList': taskDataList[j].taskList
                                    }
                                    value.push(Object.assign({}, projectList[i], obj));
                                    flag = false;
                                    break;
                                } else {
                                    flag = true;
                                }
                            }
                            if (flag === true) {
                                value.push(Object.assign({}, projectList[i], {
                                    'parentTask': {
                                        'parentTaskName': null,
                                        'parentTaskId': null
                                    },
                                    'taskList': []
                                }));
                            }
                            if(taskDataList.length < 1){
                                value.push(Object.assign({}, projectList[i], {
                                    'parentTask': {
                                        'parentTaskName': null,
                                        'parentTaskId': null
                                    },
                                    'taskList': []
                                }));
                            }
                        }
                    })
                    .catch((err) => {
                        sendError(err, res);
                    });
                db.collection('userTable')
                    .find()
                    .toArray()
                    .then((user) => {
                        var obj = {
                            'projectList': value,
                            'userList': user
                        }
                        response.data = obj;
                        res.json(response);
                    })
                    .catch((err) => {
                        sendError(err, res);
                    });

            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.post('/addNewTask', (req, res) => {
    let statusTemp = 'Not Updated';
    if (Date.parse(req.body.startDate) > new Date() && Date.parse(req.body.endDate) > new Date()) {
        statusTemp = 'Yet to start';
    } else if (Date.parse(req.body.startDate) < new Date() && Date.parse(req.body.endDate) < new Date()) {
        statusTemp = 'Completed';
    } else if (Date.parse(req.body.startDate) < new Date() && Date.parse(req.body.endDate) > new Date()) {
        statusTemp = 'In-Progress';
    }
    var value = {
        'projectId': req.body.projectId,
        'parentTask': {
            'parentTaskId': req.body.parentTaskId,
            'parentTaskName': req.body.parentTaskName,
        },
        'taskList': [{
            'taskId': ObjectId(),
            'projectId': req.body.projectId,
            'taskName': req.body.taskName,
            'startDate': req.body.startDate,
            'endDate': req.body.parentTaskStatus ? '' : req.body.endDate,
            'priority': req.body.parentTaskStatus ? '' : req.body.priority,
            'status': statusTemp,
            'parentTaskId': req.body.parentTaskId,
            'parentTaskName': req.body.parentTaskName,
            'parentTaskStatus': req.body.parentTaskStatus,
            'userId': req.body.parentTaskId
        }]
    }
    connection((db) => {
        db.collection('taskTable')
            .insert(value)
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.put('/updateTask', (req, res) => {
    var value = {
        'projectId': req.body.projectId,
        'parentTask': {
            'parentTaskId': req.body.parentTaskId,
            'parentTaskName': req.body.parentTaskName,
        },
        'taskList': formData(req.body.taskList)
    }
    function formData(taskList) {
        var val = [];
        for (var i = 0; i < taskList.length; i++) {
            let statusTemp = 'Not Updated';
            if (Date.parse(taskList[i].startDate) > new Date() && Date.parse(taskList[i].endDate) > new Date()) {
                statusTemp = 'Yet to start';
            } else if (Date.parse(taskList[i].startDate) < new Date() && Date.parse(taskList[i].endDate) < new Date()) {
                statusTemp = 'Completed';
            } else if (Date.parse(taskList[i].startDate) < new Date() && Date.parse(taskList[i].endDate) > new Date()) {
                statusTemp = 'In-Progress';
            }
            val.push({
                'taskId': taskList[i]['taskId'] != '' ? taskList[i]['taskId'] : ObjectId(),
                'projectId': taskList[i].projectId,
                'taskName': taskList[i].taskName,
                'startDate': taskList[i].startDate,
                'endDate': taskList[i].endDate,
                'priority': taskList[i].priority,
                'status': statusTemp,
                'parentTaskId': taskList[i].parentTaskId,
                'parentTaskName': taskList[i].parentTaskName,
                'parentTaskStatus': taskList[i].parentTaskStatus,
                'userId': taskList[i].userId
            })
        }
        return val;
    }
    connection((db) => {
        db.collection('taskTable')
            .update({ projectId: req.body.projectId }, {
                $set: {
                    parentTask: {
                        parentTaskName: req.body.parentTaskName,
                        parentTaskId: req.body.parentTaskId
                    },
                    taskList: value['taskList']
                }
            })
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });

});
//  taskListTable 
router.get('/viewTaskGet', (req, res) => {
    connection((db) => {
        db.collection('projectListTable')
            .find()
            .toArray()
            .then((projectData) => {
                var project = projectData;
                db.collection('taskTable')
                    .find()
                    .toArray()
                    .then((taskData) => {
                        var task = taskData;
                        db.collection('userTable')
                        .find()
                        .toArray()
                        .then((user) => {
                            var obj = {
                                'projectList': project,
                                'taskList': task,
                                'userList': user
                            }
                            response.data = obj;
                            res.json(response);
                        })
                        .catch((err) => {
                            sendError(err, res);
                        });
                    })
                    .catch((err) => {
                        sendError(err, res);
                    });
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

/** Task table implementation ends here */

module.exports = router;
