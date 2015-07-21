library(jsonlite)
library(plyr)
library(httr)
library(RCurl)
library(XML)

datavar = "AGGREGATE_DATA"
units <- c("urls","requests")
countries <- c("AT","BE","BG","CH","CY","CZ","DE","DK","EE","ES","FI","FR","GB","GR","HR","HU","IE","IS","IT","LI","LT","LU","LV","MT","NL","NO","PL","PT","RO","SE","SI","SK")
issues <- c("cp","political","private_personal_info","public_figure","serious_crime")

dataCOLL <- data.frame()

## for all snapshots of the Transparency Report do:
## read the html from a live version in Wayback Machine, save locally 
## read the html from your local file system, analyse

## ------ Step 1: scrape the html from live URLs on Wayback Machine
t <- read.table("dataURLs.txt", sep=";")
for(f in t$V2){  
  content1 <- readLines(f)

  ## scrape date of data entry from source and format
  html <- getURL(f)
  doc = htmlParse(html, asText=TRUE)
  logdate0 <- xpathSApply(doc, "//p[@class='disclaimer'][1]", xmlValue)
  logdate1 <- gsub('\n', '', logdate0)
  logdate2 <- unlist(strsplit(logdate1,": "))[2]  
  logdate3 <- as.Date(logdate2, format="%B %d, %Y")  ## this is not perfect, it has problems with date format if the month name is not english
  
  ## write raw HTML to local with date as filename
  write(content1, file=paste("rawHTML/googleTR_snapshot_",logdate3,".html", sep=""))

  print (f)
}

## ------ Step 2: scrape the html from saved html files in file system
for(f in list.files(path = "rawHTML/")){  
  content1 <- readLines(paste("rawHTML/",f,sep=""))
  print (f)
  
  ## parse logdate from file name
  logdate <- substr(f, 19, 28)
  
  ## isolate data object with name defined in "datavar" (i.e. "AGGREGATE_DATA") in the source 
  content2 = paste(content1, collapse="\n")
  content3 <- unlist(strsplit(content2, "var"))
  content4 <- content3[grep(datavar,content3)]
  datavalueJSON <- unlist(strsplit(content4,"="))[2]
  
  ## convert data from JSON and stick it into a data.frame
  datavalue <- fromJSON(datavalueJSON)
  data <- t(as.data.frame(datavalue))
  dataDF <- data.frame(names=row.names(data), value=data[,1])
  
  ## parse the full country names
  dataNAME <- dataDF[lapply(gregexpr(".name", row.names(data), perl=T),"[[",1)>0,]
  dataNAME$CountryCode <- as.factor(sapply(strsplit(as.character(dataNAME[,"names"]), "\\."),"[[",1))
  
  ## split the data row.names to extract meta data
  dataSEL <- dataDF[lapply(gregexpr(".issue.", row.names(data), perl=T),"[[",1)>0,]
  
  dataSEL$CountryCode <- as.factor(sapply(strsplit(as.character(dataSEL[,"names"]), "\\."),"[[",1))
  dataSEL$CountUnit <- as.factor(sapply(strsplit(as.character(dataSEL[,"names"]), "\\."),"[[",2))
  dataSEL$Issue <- as.factor(sapply(strsplit(as.character(dataSEL[,"names"]), "\\."),"[[",4))
  dataSEL$Outcome <- as.factor(sapply(strsplit(as.character(dataSEL[,"names"]), "\\."),"[[",5))
  dataSEL$VALUE <- as.numeric(as.character(dataSEL$value))
  
  ## merge data with full country names
  dataMERGE <- merge(dataNAME, dataSEL, by.x="CountryCode", by.y="CountryCode")
  
  
  ## ----------------------------------------------------------------------------------------------
  ## add the addtional outcome label 'undefined' here
  ## 'undefined' = for each country/issue/unit: 'total' - SUM {'complied', 'rejected', 'need more info', 'pending'}
  dataM <- dataMERGE[dataMERGE$CountryCode!="ALL",c("value.x", "CountryCode", "CountUnit", "Issue", "Outcome", "VALUE")]
  dataM$logdate <- logdate
  
  for(c in countries){
    for(u in units){
      for(i in issues){
        dTmp <- dataM[dataM$CountryCode==c & dataM$CountUnit==u & dataM$Issue==i,]
        undercarpet <- dTmp[dTmp$Outcome=="total","VALUE"]-sum(dTmp[dTmp$Outcome!="total","VALUE"])
        ucDF <- data.frame(value.x=dTmp[dTmp$Outcome=="total","value.x"],
                           CountryCode = as.factor(c),CountUnit = as.factor(u),Issue = as.factor(i),
                           Outcome = as.factor("undefined"),VALUE = undercarpet,
                           logdate=logdate)
        dataM <- rbind.data.frame(dataM, ucDF)
      }
    }
  }
  
  if(dim(dataCOLL)[1]==0){
    dataCOLL <- dataM
  }else{
    dataCOLL <- rbind.data.frame(dataCOLL, dataM)
  }
  
}

## remove "total" count from the data frame as this is now the sum of {'complied', 'rejected', 'need more info', 'pending', 'undefined'}
dataCLEAN <- dataCOLL[dataCOLL$Outcome!="total",]
names(dataCLEAN)[1] <- "CountryName"
dataTIMESERIES <- dataCLEAN
summary(dataTIMESERIES)
head(dataTIMESERIES)

## save to R object
save(dataTIMESERIES, file="dataTIMESERIES.Rdata")

## print to table
write.table(dataTIMESERIES, file="dataTIMESERIES.csv", row.names=F, col.names=T, quote=F, sep=",")

