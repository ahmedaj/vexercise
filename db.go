package main

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"log"
)

const DBFileName = "DBFile.db"

type Student struct {
	ID       int    `json:"id"`
	FullName string `json:"fullname"`
	Email    string `json:"email"`
	Age      int    `json:"age"`
	Mark     int    `json:"mark"`
}

var studentList []Student
var MaxId int

// Write to DB
func WriteDB() {
	data, _ := json.MarshalIndent(studentList, "", " ")
	_ = ioutil.WriteFile(DBFileName, data, 0644)
}

func ReadDB() {
	studentList = nil
	studentList = make([]Student, 0)

	data, _ := ioutil.ReadFile(DBFileName)
	_ = json.Unmarshal([]byte(data), &studentList)

	MaxId = -1
	for _, std := range studentList {
		if std.ID > MaxId {
			MaxId = std.ID
		}
	}
}

func SelectStudent(id int) (int, *Student) {
	for idx, element := range studentList {
		if element.ID == id {
			return idx, &element
		}
	}

	return -1, nil
}

func DeleteStudent(id int) error {
	idx, _ := SelectStudent(id)
	log.Println("IDX IS %d", idx)
	if idx != -1 {
		studentList = append(studentList[:idx], studentList[idx+1:]...)
		WriteDB()
		log.Println("Everything went find in the")
		return nil
	}

	return errors.New("id not exist!")
}

func AddStudent(std Student) {
	if std.ID < 0 {
		MaxId += 1
		std.ID = MaxId
	} else {
		idx, stud := SelectStudent(std.ID)
		// Invalid student ID, so just skip it
		if stud == nil {
			MaxId += 1
			std.ID = MaxId
		} else {
			// just remove it for simplicity
			studentList = append(studentList[:idx], studentList[idx+1:]...)
		}
	}

	studentList = append(studentList, std)
	WriteDB()
}
