package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
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

func main() {
	router := gin.Default()

	router.Static("/assets", "./assets")
	router.LoadHTMLGlob("html/*.html")

	router.GET("/", getIndexPage)

	router.GET("/student", listStudents)
	router.GET("/student/:studentId", listStudents)

	router.POST("/student", editStudent)
	router.PUT("/student", editStudent)

	router.DELETE("/student", deleteStudent

	router.Run(":8080")
}

// getAlbums responds with the list of all albums as JSON.
func listStudents(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, albums)
}

func editStudent(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, albums)
}


func deleteStudent(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, albums)
}

