needs(magrittr)
needs(stlplus)

vectorToTS <- function(data) {
  print("vectorToTs")
  ul <- unlist(strsplit(data,","))
  dataMatrix <- matrix(ul, length(data), 2, T)

  # Retrieving first and last months and weeks
  firstDateRow <- head(dataMatrix[,c(1)], n=1)
  firstDate <- strsplit(toString(firstDateRow), "-")
  firstYear <- as.integer(firstDate[[1]][1])
  firstMonth <- as.integer(firstDate[[1]][2])
  lastDateRow <- tail(dataMatrix[,c(1)], n=1)
  lastDate <- strsplit(toString(lastDateRow), "-")
  lastYear <- as.integer(lastDate[[1]][1])
  lastMonth <- as.integer(lastDate[[1]][2])

  values <- dataMatrix[,c(2)]

  # Convert data to time series; using only second column (values)
  myTS <- ts(values, start=c(firstYear, firstMonth), end=c(lastYear, lastMonth), frequency=12)

  return(myTS)
}

myTS <- vectorToTS(input[[1]])
type <- input[[2]]
mySTL <- stl(myTS, t.window = NULL, s.window="periodic", robust=TRUE)
mySTL.DF <- as.data.frame(mySTL$time.series)
if(type == 'seasonal') {
  response <-  paste('seasonal:', toString(mySTL.DF$seasonal), collapse = "")
} else if(type == 'trend') {
  response <-  paste('trend:', toString(mySTL.DF$trend), collapse = "")
}
response
