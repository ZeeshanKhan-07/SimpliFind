package com.youtube.SearchSimilarComment.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "histories")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // <-- PRIMARY KEY
    private Long id;

    private String videoUrl;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
