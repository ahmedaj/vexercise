package main

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"strconv"
)

//docker run -v ~/work:/work -p 8080:8080 -p 8090:8090 --name godev -i -t ubuntu:latest
// album represents data about a record album.
type album struct {
	ID     string  `json:"id"`
	Title  string  `json:"title"`
	Artist string  `json:"artist"`
	Price  float64 `json:"price"`
}

// albums slice to seed record album data.
var albums = []album{
	{ID: "1", Title: "Blue Train", Artist: "John Coltrane", Price: 56.99},
	{ID: "2", Title: "Jeru", Artist: "Gerry Mulligan", Price: 17.99},
	{ID: "3", Title: "Sarah Vaughan and Clifford Brown", Artist: "Sarah Vaughan", Price: 39.99},
}

func getIndexPage(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", nil)
}

func MyMiddleware(c *gin.Context) {
	c.Writer.Header().Set("Content-Type", "application/json")
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.Writer.Header().Set("Access-Control-Max-Age", "86400")
	c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, X-Max")

	// Pass on to the next-in-chain
	c.Next()
}

func main() {
	ReadDB()
	studentList = append(studentList, Student{ID: 12, FullName: " AHmed JARDAT", Age: 44, Email: "A@b.com", Mark: 44})
	router := gin.Default()
	router.Use(MyMiddleware)

	router.Static("/assets", "./assets")
	router.LoadHTMLGlob("html/*.html")

	router.GET("/", getIndexPage)

	router.GET("/student", listStudents)
	router.GET("/student/:id", listStudents)

	router.POST("/student", editStudent)
	router.PUT("/student", editStudent)

	router.DELETE("/student/:id", deleteStudent)
	router.OPTIONS("/student/:ud", func(c *gin.Context) { c.JSON(http.StatusOK, struct{}{}) })

	router.Run(":8080")
}

// getAlbums responds with the list of all albums as JSON.
func listStudents(c *gin.Context) {

	id := c.Param("id")
	if len(id) == 0 {
		c.JSON(http.StatusOK, studentList)
		return
	}

	intid, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Invalid Student Id"})
		return
	}

	idx, student := SelectStudent(intid)
	if idx == -1 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Student Id doesnt not exist"})
	} else {
		c.JSON(http.StatusOK, student)
	}

}

func editStudent(c *gin.Context) {
	var std Student
	var err error
	if err = c.ShouldBindJSON(&std); err != nil {
		log.Println("ERRRRRR:%v", err)
		c.IndentedJSON(http.StatusInternalServerError, err)
	} else {
		log.Println("STD= %v", std)
		AddStudent(std)
		c.IndentedJSON(http.StatusOK, studentList)
	}
}

func deleteStudent(c *gin.Context) {

	id := c.Param("id")
	if len(id) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Missing Student Id"})
		return
	}

	intid, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Student not found"})
		return
	}

	err = DeleteStudent(intid)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Can't complete the operation please try again later!"})
		return
	}

	c.JSON(http.StatusOK, studentList)
}
